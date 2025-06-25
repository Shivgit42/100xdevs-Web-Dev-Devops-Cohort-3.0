import { useEffect, useState } from "react";

function App() {
  const [currentTab, setCurrentTab] = useState(1);
  const [tabData, setTabData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/todos/" + currentTab).then(
      async (res) => {
        const data = await res.json();
        setTabData(data);
        setIsLoading(false);
      }
    );
  }, [currentTab]);

  return (
    <div>
      <button
        onClick={() => setCurrentTab(1)}
        style={{ color: currentTab === 1 ? "red" : "black" }}
      >
        Todo #1
      </button>
      <button
        onClick={() => setCurrentTab(2)}
        style={{ color: currentTab === 2 ? "red" : "black" }}
      >
        Todo #2
      </button>
      <button
        onClick={() => setCurrentTab(3)}
        style={{ color: currentTab === 3 ? "red" : "black" }}
      >
        Todo #3
      </button>
      <button
        onClick={() => setCurrentTab(4)}
        style={{ color: currentTab === 4 ? "red" : "black" }}
      >
        Todo #4
      </button>
      <br />
      {isLoading ? "loading..." : tabData.title}
    </div>
  );
}

export default App;
