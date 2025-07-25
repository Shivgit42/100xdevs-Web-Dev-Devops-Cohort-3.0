import "./App.css";
import { Button } from "./components/ui/Button";

function App() {
  return (
    <>
      <Button variant="secondary" size="sm" text="Share" />
      <Button variant="secondary" size="md" text="Share" />
      <Button variant="primary" size="lg" text="Add content" />
    </>
  );
}

export default App;
