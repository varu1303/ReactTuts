const React = React;
const ReactDOM =  ReactDOM;

class Test extends React.Component {
  constructor() {
    super();
    this.a = 5;
  }
  render() {
    return (
      <p>Test 1 {this.a}</p>
    )
  }
}

ReactDOM.render(<Test />, document.getElementById('main'));
