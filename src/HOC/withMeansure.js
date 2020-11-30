import React from 'react';
import ReactDOM from 'react-dom';
import ResizeObserver from 'resize-observer-polyfill';

const withMeasure = WrappedComponent => {
  class Measure extends React.Component {
    constructor (props) {
      super (props);
      this.state = {
        measure: {
          left: 0,
          top: 0,
          width: 0,
          height: 0,
        },
      };
    }

    componentDidMount () {
      this.node = ReactDOM.findDOMNode (this).firstElementChild;
      this.ro = new ResizeObserver (([entry]) =>
        this.setState ({measure: entry.contentRect})
      );

      if (this.node) {
        this.ro.observe (this.node);
      }
    }

    componentWillUnmount () {
      this.ro.disconnect (this.node);
    }

    render () {
      return <WrappedComponent {...this.props} measure={this.state.measure} />;
    }
  }

  return Measure;
};

export default withMeasure;
