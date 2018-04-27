var React = require('react');
var ReactDOM = require('react-dom');

import a from './var1.js';

console.log(a);


class Test2 extends React.Component {
  b = 2;

  render() {
    return (
      <p>
        Hey {this.b} and {a}
      </p>
    )
  }
}


ReactDOM.render(<Test2 />, document.getElementById('main'));