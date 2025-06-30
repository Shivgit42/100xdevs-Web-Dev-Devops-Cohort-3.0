import "./App.css";
import { useFetch } from "./hooks/useFetch";

function App() {
  const { finalData, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts/3da"
  );

  if (loading)
    return (
      <div>
        <p>Loading....</p>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return <div>{JSON.stringify(finalData)}</div>;
}

export default App;
