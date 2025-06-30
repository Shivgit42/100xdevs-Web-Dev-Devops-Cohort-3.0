import "./App.css";

let currentClock;

function App() {
  return (
    <div>
      <DebouncedSearchBackend />
      <DebouncedSearchBackend />
      <DebouncedSearchBackend />
      <DebouncedSearchBackend />
      <DebouncedSearchBackend />
      <DebouncedSearchBackend />
      <DebouncedSearchBackend />
      <DebouncedSearchBackend />
      <DebouncedSearchBackend />
    </div>
  );
}

function SearchBackend() {
  console.log("request sent to the backend");
}

function DebouncedSearchBackend() {
  clearTimeout(currentClock);
  currentClock = setTimeout(SearchBackend, 30);
}

export default App;
