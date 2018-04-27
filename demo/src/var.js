import a from './var1.js';

import React from 'react';
import ReactDOM from 'react-dom';


class Test1 extends React.Component {

  b = 10;

  render() {
    return(
      <div>
        <p>Hello! {a} - {this.b}</p>
      </div>
    )
  }
}

ReactDOM.render(<Test1 />, document.getElementById('main'));
