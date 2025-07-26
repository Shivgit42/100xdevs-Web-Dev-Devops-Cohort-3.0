import { Sidebar } from "./components/Sidebar";
import { Button } from "./components/ui/Button";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div>
        <Button
          variant="secondary"
          size="lg"
          startIcon={<ShareIcon size="md" />}
          text="Share Brain"
        />
        <Button
          variant="primary"
          size="lg"
          startIcon={<PlusIcon size="md" />}
          text="Add content"
        />
      </div>
    </div>
  );
}

export default App;
