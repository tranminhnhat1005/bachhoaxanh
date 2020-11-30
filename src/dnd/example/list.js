import React from 'react';
import PropTypes from 'prop-types';
import {arrayMove} from '../../utils/dndUtils';

const style = {};
class List extends React.Component {
  state = {
    items: this.props.items,
    isSorting: false,
  };

  static propTypes = {
    items: PropTypes.array,
    className: PropTypes.string,
    itemClass: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    onSortStart: PropTypes.func,
    onSortEnd: PropTypes.func,
    component: PropTypes.func,
    shouldUseDragHandle: PropTypes.bool,
    disabledItems: PropTypes.arrayOf (PropTypes.string),
  };

  static defaultProps = {
    className: `${style.list} ${style.stylizedList}`,
    itemClass: `${style.item} ${style.stylizedItem}`,
    width: 400,
    height: 600,
  };

  onSortStart = (sortEvent, nativeEvent) => {
    const {onSortStart} = this.props;
    this.setState ({isSorting: true});

    document.body.style.cursor = 'grabbing';

    if (onSortStart) {
      onSortStart (sortEvent, nativeEvent, this.refs.component);
    }
  };

  onSortEnd = (sortEvent, nativeEvent) => {
    const {onSortEnd} = this.props;
    const {oldIndex, newIndex} = sortEvent;
    const {items} = this.state;

    this.setState ({
      items: arrayMove (items, oldIndex, newIndex),
      isSorting: false,
    });

    document.body.style.cursor = '';

    if (onSortEnd) {
      onSortEnd (sortEvent, nativeEvent, this.refs.component);
    }
  };

  render () {
    const Component = this.props.component;
    const {items, isSorting} = this.state;
    const props = {
      isSorting,
      items,
      onSortEnd: this.onSortEnd,
      onSortStart: this.onSortStart,
      ref: 'component',
      useDragHandle: this.props.shouldUseDragHandle,
    };

    return <Component {...this.props} {...props} />;
  }
}

export default List;
