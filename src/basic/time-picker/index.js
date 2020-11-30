/**@jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import randomString from '../../utils/Diginet-Core-UI/randomString';

// const addZero = (i) => {
//     if (i < 10) {
//         i = '0' + i;
//     }
//     return i;
// };


const Id = randomString({ allowNumber: false, allowSymbol: false });
const IDs = {
	container    : Id + 'time-picker-container',
	main         : Id + 'time-picker-main',
	inputWrapper : Id + 'time-picker-input-wrapper',
	inputTypeText: Id + 'time-picker-input-type-text',
	icon         : Id + 'time-picker-icon',
	clock        : Id + 'time-picker-clock',
};


const TimePicker = () => {
    
    const Container = css`
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        /* perspective: 800px; */
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        width: 600px;
        height: 300px;
        
    `;
    
	return (
		<div css={Container} id={IDs.container}>
            <div className={'hour'} id={'hour'}>
                <div className='select-wrap'>
                                
                </div>
            </div>
			<div className={'minute'} id={'minute'}></div>
		</div>
	);
};

export default TimePicker;

/**> div {
            flex: 1;
        }
        .select-wrap {
            position: relative;
            // top: 200px;
            height: 100%;
            perspective: 1200px;
            text-align: center;
            overflow: hidden;
            font-size: 20px;
            color: #ddd;
            :before, :after {
                position: absolute;
                z-index: 1;
                display: block;
                content: '';
                width: 100%;
                height: 50%;
            }
            :before {
                top: 0;
                background-image: linear-gradient(to bottom, rgba(1, 1, 1, 0.5), rgba(1, 1, 1, 0));
            }
            :after {
                bottom: 0;
                background-image: linear-gradient(to top, rgba(1, 1, 1, 0.5), rgba(1, 1, 1, 0));
            }

            .select-options {
                position: absolute;
                top: 50%;
                left: 0;
                width: 100%;
                height: 0;
                transform-style: preserve-3d;
                margin: 0 auto;
                display: block;
                transform: translateZ(-150px) rotateX(0deg);
                -webkit-font-smoothing: subpixel-antialiased;
                color: #666;
                .select-option {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 50px;

                    -webkit-font-smoothing: subpixel-antialiased;
                    @for $i from 1 through 100 {
                        :nth-of-type(#{$i}) {
                        transform: rotateX(-18deg * ($i - 1)) translateZ(150px);
                        }
                    }
                }
            }
        }

        .highlight {
            font-size: 20px;
            position: absolute;
            top: 50%;
            transform: translate(0, -50%);
            width: 100%;
            background-color: #000;
            border-top: 1px solid #333;
            border-bottom: 1px solid #333;
            font-size: 24px;
            overflow: hidden;
            }
        .highlight-list {
            // display: none;
            position: absolute;
            width: 100%;
        } */
