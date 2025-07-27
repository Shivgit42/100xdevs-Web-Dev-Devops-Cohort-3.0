import { useState } from "react";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { CreateContentModel } from "./components/CreateContentModal";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";
import { Sidebar } from "./components/Sidebar";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <Sidebar />
      <div className="ml-72 p-4 min-h-screen bg-[#f9fafb] ">
        <CreateContentModel
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="flex justify-end gap-4">
          <Button
            variant="secondary"
            text="Share Brain"
            startIcon={<ShareIcon />}
          />
          <Button
            onClick={() => {
              setModalOpen(true);
            }}
            variant="primary"
            text="Add Content"
            startIcon={<PlusIcon />}
          />
        </div>
        <div className="flex gap-4">
          <Card
            title="First tweet"
            type="twitter"
            link="https://x.com/superSaiyanSkai/status/1949087501915729994"
          />
          <Card
            title="First youtube"
            type="youtube"
            link="https://www.youtube.com/watch?v=8BtHk-oNlN0"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
