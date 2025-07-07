import "./App.css";
import { MainContent } from "./components/main-content/MainContent";
import { Sidebar4 } from "./components/sidebars/Sidebar4";

function App() {
  return (
    <div className="flex">
      <Sidebar4 />
      <MainContent />
    </div>
  );
}

export default App;
