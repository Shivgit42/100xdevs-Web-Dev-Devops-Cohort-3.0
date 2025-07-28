import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModel } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();

  useEffect(() => {
    if (!modalOpen) {
      refresh();
    }
  }, [modalOpen]);

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
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                {
                  share: true,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );
              const shareUrl = `http://localhost:5173/share/${response.data.hash}`;

              await navigator.clipboard.writeText(shareUrl);
              alert("Successfully copied the url to clipboard");
            }}
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
        <div className="flex gap-4 flex-wrap">
          {contents.map(({ title, link, tags, type }, index) => (
            <Card
              key={index}
              title={title}
              link={link}
              tags={tags}
              type={type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
