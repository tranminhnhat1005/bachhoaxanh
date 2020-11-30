const easing = {
    easingOutCubic: function (pos) {
        return (Math.pow(pos - 1, 3) + 1);
    },
    easingOutQuart: function (pos) {
        return (Math.pow(pos - 1, 4) - 1);
    }
}

export default class renderSelector {
    constructor(options) {
        let defaults = {
            el: '',
            type: 'infinite',
            count: 20,
            sensitivity: 0.8,
            source: [],
            value: null,
            onChange: null,
        };
        this.options = Object.assign({}, defaults, options);
        this.options.count = this.options.count - (this.options.count % 4);
        Object.assign(this, this.options);

        this.halfCount    = this.options.count / 2;
        this.quarterCount = this.options.count / 4;
        this.a            = this.options.sensitivity * 10;
        this.minV         = Math.sqrt(1 / this.a);
        this.selected     = this.source[0];

        this.exceedA = 10;
        this.moveT   = 0;
        this.moving  = false;

        this.elements = {
            el: document.querySelector(this.options.el),
            circleList: null,
            circleItems: null,

            highlight: null,
            highlightList: null,
            highListItems: null,
        };

        this.events = {
            touchstart: null,
            touchmove: null,
            touchend: null,
        };
        this.itemHeight = (this.elements.el.offsetHeight * 3) / this.options.count;
        this.itemAngle  = 360 / this.options.count;
        this.radius     = this.itemHeight / Math.tan((this.itemAngle * Math.PI) / 180);

        this.scroll = 0;
        this._init();
    }
    _init() {
        this._create(this.options.source);

        let touchData = {
            startY: 0,
            yArray: [],
        };

        for (let eventName in this.events) {
            this.events[eventName] = ((eventName) => {
                return (e) => {
                    if (this.elements.el.contains(e.target) || e.target === this.elements.el) {
                        e.preventDefault();
                        if (this.source.length) {
                            this['_' + eventName](e, touchData);
                        }
                    }
                };
            })(eventName);
        }
        this.elements.el.addEventListener('touchstart', this.events.touchstart);
        document.addEventListener('mousedown', this.events.touchstart);
        this.elements.el.addEventListener('touchend', this.events.touchend);
        document.addEventListener('mouseup', this.events.touchend);

        if (this.source.length) {
            this.value = this.value !== null ? this.value : this.source[0].value;
            this.select(this.value);
        }
    }

    _touchstart(e, touchData) {
        this.elements.el.addEventListener('touchmove', this.events.touchmove);
        document.addEventListener('mousemove', this.events.touchmove);
        let eventY = e.clientY || e.touches[0].clientY;
        touchData.startY = eventY;
        touchData.yArray = [[eventY, new Date().getTime()]];
        touchData.touchScroll = this.scroll;
        this._stop();
    }

    _touchmove(e, touchData) {
        let eventY = e.clientY || e.touches[0].clientY;
        touchData.yArray.push([eventY, new Date().getTime()]);
        if (touchData.length > 5) {
            touchData.unshift(); // like .length
        }

        let scrollAdd = (touchData.startY - eventY) / this.itemHeight;
        let moveToScroll = scrollAdd + this.scroll;

        if (this.type === 'normal') {
            if (moveToScroll < 0) {
                moveToScroll *= 0.3;
            } else if (moveToScroll > this.source.length) {
                moveToScroll = this.source.length + (moveToScroll - this.source.length) * 0.3;
            }
        } else {
            moveToScroll = this._normalizeScroll(moveToScroll);
        }

        touchData.touchScroll = this._moveTo(moveToScroll);
    }

    _touchend(e, touchData) {
        this.elements.el.removeEventListener('touchmove',this.events.touchmove);
        document.removeEventListener('mousemove', this.events.touchmove);

        // console.log(touchData.yArray)
        let v;
        if (touchData.yArray.length === 1) {
            v = 0;
        } else {
            let startTime = touchData.yArray[touchData.yArray.length - 2][1];
            let endTime   = touchData.yArray[touchData.yArray.length - 1][1];
            let startY    = touchData.yArray[touchData.yArray.length - 2][0];
            let endY      = touchData.yArray[touchData.yArray.length - 1][0];

            v = (((startY - endY) / this.itemHeight) * 1000) / (endTime - startTime);

            let sign = v > 0 ? 1 : -1;
            v = Math.abs(v) > 30 ? 30 * sign : v;
        }

        this.scroll = touchData.touchScroll;
        this._animateMoveByInitV(v);
    }

    _create(source) {
        if (!source.length) {
            return;
        }

        let template = `<div class="select-wrap">
                            <ul class="select-options" style="transform: translate3d(0, 0, ${-this.radius}px) rotateX(0deg);">
                                {{circleListHTML}}
                            </ul>
                            <div class="highlight">
                                <ul class="highlight-list">
                                    {{highlightListHTML}}
                                </ul>
                            </div>
                        </div>`;
        
        if (this.options.type === 'infinite') {
            let concatSource = [].concat(source);
            while (concatSource.length < this.halfCount) {
                concatSource = concatSource.concat(source);
            }
            source = concatSource;
        }
        this.source = source;
        let sourceLength = source.length;

        let circleListHTML = '', highlightListHTML = '', i = 0, j = 0, k = 0;
        for (i; i < source.length; i++) {
            circleListHTML += `<li 
                                    class="select-option" 
                                    style="
                                        top: ${this.itemHeight * -0.5}px;
                                        height: ${this.itemHeight}px;
                                        line-height: ${this.itemHeight}px;
                                        transform: rotateX(${-this.itemAngle * i}deg) translate3d(0, 0, ${this.radius}px);"
                                    data-index="${i}"
                                >
                                    ${source[i].text}
                                </li>`;
        }

        for (j; j < source.length; j++) {
            highlightListHTML += `<li 
                                        class="highlight-item"
                                        style="height: ${this.itemHeight}px;"
                                    >${source[j].text}</li>`;
        }

        if (this.options.type === 'infinite') {
            for (k; k < this.quarterCount; k++) {
                circleListHTML = `<li 
                                        class="select-option"
                                        style="
                                            top: ${this.itemHeight * -0.5}px;
                                            height: ${this.itemHeight}px;
                                            line-height: ${this.itemHeight}px;
                                            transform: rotateX(${this.itemAngle * (k + 1)}deg) translate3d(0, 0, ${this.radius}px);"
                                        data-index="${-k - 1}">
                                        ${source[sourceLength - k - 1].text}
                                    </li>` + circleListHTML;
                
                circleListHTML += `<li
                                        class="select-option"
                                        style="
                                            top: ${this.itemHeight * -0.5}px
                                            height: ${this.itemHeight}px;
                                            transform: rotateX(${-this.itemAngle * (k + sourceLength)}deg) translate3d(0, 0, ${this.radius}px);"
                                        data-index="${k + sourceLength}">
                                        ${source[k].text}
                                    </li>`;
            }
            highlightListHTML = `<li class="highlight-item" style="height: ${this.itemHeight}px;">
                                ${source[sourceLength - 1].text}
                            </li>` + highlightListHTML;
            
            highlightListHTML += `<li class="highlight-item" style="height: ${this.itemHeight}px;">
                                ${source[0].text}
                            </li>`;
        }

        const El = this.elements;
        El.el.innerHTML  = template.replace('{{circleListHTML}}', circleListHTML).replace('{{highlightListHTML}}', highlightListHTML);
        El.circleList    = El.el.querySelector('.select-options');
        El.circleItems   = El.el.querySelectorAll('.select-option');
        El.highlight     = El.el.querySelector('.highlight');
        El.highlightList = El.el.querySelector('.highlight-list');
        El.highListItems = El.el.querySelectorAll('.highlight-item');

        if (this.type === 'infinite') {
            El.highlightList.style.top = -this.itemHeight + 'px';
        }
        
        El.highlight.style.height 	  = this.itemHeight + 'px';
        El.highlight.style.lineHeight = this.itemHeight + 'px';
    }

    _normalizeScroll(scroll) {
        let normalizedScroll = scroll;

        while (normalizedScroll < 0) {
            normalizedScroll += this.source.length;
        }
        normalizedScroll = normalizedScroll % this.source.length;
        return normalizedScroll;
    }

    _moveTo(scroll) {
        if (this.type === 'infinite') {
            scroll = this._normalizeScroll(scroll);
        }
        const El = this.elements;

        El.circleList.style.transform    = `translate3d(0, 0, ${this.radius}px) rotateX(${this.itemAngle * scroll}deg)`;
        El.highlightList.style.transform = `translate3d(0, ${-scroll * this.itemHeight}px, 0)`;

        [...El.circleItems].forEach((itemElem) => {
            if (Math.abs(itemElem.dataset.index - scroll) > this.quarterCount) {
                itemElem.style.visibility = 'hidden';
            } else {
                itemElem.style.visibility = 'visible';
            }
        });
        return scroll;
    }

    async _animateMoveByInitV(initV) {
        let initScroll, finalScroll, totalScrollLen, a, t;

        if (this.type === 'normal') {
            if (this.scroll < 0 || this.scroll > this.source.length - 1) {
                a              = this.exceedA;
                initScroll     = this.scroll;
                finalScroll    = this.scroll < 0 ? 0 : this.source.length - 1;
                totalScrollLen = initScroll - finalScroll;

                t      = Math.sqrt(Math.abs(totalScrollLen / a));
                initV  = a * t;
                initV  = this.scroll > 0 ? -initV : initV;
                // finalV = 0;
                await this._animateToScroll(initScroll, finalScroll, t);
            } else {
                initScroll     = this.scroll;
                a              = initV > 0 ? -this.a : this.a;
                t              = Math.abs(initV / a);
                totalScrollLen = initV * t + (a * t * t) / 2;
                finalScroll    = Math.round(this.scroll + totalScrollLen);
                finalScroll    = finalScroll < 0 ? 0 : finalScroll > this.source.length - 1 ? this.source.length - 1 : finalScroll;
                totalScrollLen = finalScroll - initScroll;
                t			   = Math.sqrt(Math.abs(totalScrollLen / a));
                await this._animateToScroll(this.scroll, finalScroll, t, 'easeOutQuart');
            }
        } else {
            initScroll     = this.scroll;
            a              = initV > 0 ? -this.a : this.a;
            t              = Math.abs(initV / a);
            totalScrollLen = initV * t + (a * t * t) / 2;
            finalScroll    = Math.round(this.scroll + totalScrollLen);
            await this._animateToScroll(this.scroll, finalScroll, t, 'easingOutQuart');
        }

        this._selectByScroll(this.scroll);
    }

    _animateToScroll(initScroll, finalScroll, t, easingName = 'easingOutQuart') {
        if (initScroll === finalScroll || t === 0) {
            this._moveTo(initScroll);
            return;
        }

        let start = new Date().getTime() / 1000;
        let pass = 0;
        let totalScrollLen = finalScroll - initScroll;

        return new Promise((resolve, reject) => {
            this.moving = true;
            let tick = () => {
                pass = new Date().getTime() / 1000 - start;
                if (pass < t) {
                    this.scroll = this._moveTo(initScroll + easing[easingName](pass / t) * totalScrollLen);
                    this.moveT = requestAnimationFrame(tick);
                } else {
                    resolve();
                    this._stop();
                    this.scroll = this._moveTo(initScroll + totalScrollLen);
                }
            };
            tick();
        });
    }

    _stop() {
        this.moving = false;
        cancelAnimationFrame(this.moveT);
    }

    _selectByScroll(scroll) {
        scroll = this._normalizeScroll(scroll) | 0;
        if (scroll > this.source.length - 1) {
            scroll = this.source.length - 1;
            this._moveTo(scroll);
        }
        this._moveTo(scroll);
        this.scroll   = scroll;
        this.selected = this.source[scroll];
        this.value    = this.selected.value;
        this.onChange && this.onChange(this.selected);
    }

    updateSource(source) {
        this._create(source);

        if (!this.moving) {
            this._selectByScroll(this.scroll);
        }
    }

    select(value) {
        for (let i = 0; i < this.source.length; i++) {
            if (this.source[i].value === value) {
                window.cancelAnimationFrame(this.moveT);

                let initScroll = this._normalizeScroll(this.scroll);
                let finalScroll = i;
                let t = Math.sqrt(Math.abs((finalScroll - initScroll) / this.a));
                this._animateToScroll(initScroll, finalScroll, t);
                setTimeout(() => this._selectByScroll(i));
                return;
            }
        }
        throw new Error(`can not select value: ${value}, ${value} match nothing in current source`);
    }

    destroy() {
        this._stop();
        for (let eventName in this.events) {
            this.elements.el.removeEventListener(`${eventName}`, this.events[eventName]);
        }

        document.removeEventListener('mousedown', this.events['touchstart']);
        document.removeEventListener('mousemove', this.events['touchmove']);
        document.removeEventListener('mouseup', this.events['touchend']);
        this.elements.el.innerHTML = '';
        this.elements = null;
    }
}
