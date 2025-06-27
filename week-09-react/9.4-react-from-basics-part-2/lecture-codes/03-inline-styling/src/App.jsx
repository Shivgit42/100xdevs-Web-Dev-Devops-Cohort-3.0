function App() {
  return (
    <div>
      {/* Render the MyComponent component */}
      <MyComponent />
    </div>
  );
}

// Create a MyComponent component that will render a div element with inline CSS
function MyComponent() {
  return (
    <div
      style={{
        backgroundColor: "blue",
        color: "white",
        padding: 10,
        borderRadius: 20,
      }}
    >
      Hello, World!
    </div>
  );
}

export default App;
