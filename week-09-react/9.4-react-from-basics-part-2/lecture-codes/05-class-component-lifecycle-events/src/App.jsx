import { Component } from "react";

function App() {
  return (
    <div>
      <MyComponent />
    </div>
  );
}

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    console.log("Component mounted");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps);
    console.log(prevState);
    console.log("Component updated");
  }

  componentWillUnmount() {
    console.log("Component will unmount");
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}

export default App;
