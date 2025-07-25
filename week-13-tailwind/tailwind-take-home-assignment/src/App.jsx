import "./App.css";
import { MainContent } from "./components/MainContent/MainContent";
import { Sidebar } from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;
