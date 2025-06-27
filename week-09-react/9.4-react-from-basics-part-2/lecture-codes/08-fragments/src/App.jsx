import { Fragment } from "react";

function App() {
  return (
    <>
      <h1>Hello Baccho!</h1>
      <MyComponent />
    </>
  );
}

const MyComponent = () => {
  return (
    <Fragment>
      <h2>Hello</h2>
      <p>World</p>
    </Fragment>
  );
};

export default App;

//? Notes
// Two ways we can use fragments,
//  1) <></>
// 2) Using Fragment
