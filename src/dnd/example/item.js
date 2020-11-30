import React from 'react';
import element from '../element';

export default class Item extends React.Component {
  render () {
    const SortableItem = element (({item}) => {
      return (
        <div
          style={{
            border: '2px solid #F00',
            background: '#0DD',
            padding: '10px',
            marginBottom: '10px',
          }}
        >
          {item}
        </div>
      );
    });

    return <SortableItem index={this.props.index} item={this.props.item} />;
  }
}
