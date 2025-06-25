import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <div>
      <ErrorBoundary>
        <Card1 />
      </ErrorBoundary>
      <ErrorBoundary>
        <Card2 />
      </ErrorBoundary>
      <Card3 />
    </div>
  );
}

function Card1() {
  throw new Error("Error While Rendering Card 1");

  return (
    <div style={{ background: "red", borderRadius: 20, padding: 20 }}>
      hi there
    </div>
  );
}

function Card2() {
  return (
    <div
      style={{
        background: "red",
        borderRadius: 20,
        padding: 20,
        marginTop: 20,
      }}
    >
      hello there
    </div>
  );
}

function Card3() {
  return (
    <div
      style={{
        background: "red",
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
      }}
    >
      Card
    </div>
  );
}

export default App;
