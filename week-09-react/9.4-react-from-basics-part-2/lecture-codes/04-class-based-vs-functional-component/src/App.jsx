import { Component, useState } from "react";

const App = () => {
  return (
    <div>
      <ClassCounter />
      <FunctionalCounter />
    </div>
  );
};

class ClassCounter extends Component {
  state = { count: 0 };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

const FunctionalCounter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* Render the count property from the state object */}
      <p>Count: {count}</p>

      {/* Create a button element with an onClick event that will call the increment function */}
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default App;
