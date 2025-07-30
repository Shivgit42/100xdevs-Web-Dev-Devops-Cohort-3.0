import { useEffect, useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface ContentModalProps {
  open: boolean;
  onClose: () => void;
}

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Documents = "document",
  Links = "link",
  Tags = "tag",
}

export const CreateContentModel = ({ open, onClose }: ContentModalProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    if (open) {
      setTagsInput("");
      if (titleRef.current) titleRef.current.value = "";
      if (linkRef.current) linkRef.current.value = "";
      setType(ContentType.Youtube);
    }
  }, [open]);

  const addContent = async () => {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      {
        title,
        link,
        tags,
        type,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-100 opacity-60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-50 w-full max-w-md bg-white rounded-2xl shadow-xl p-6 animate-fadeInScale">
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition cursor-pointer"
          >
            <CrossIcon />
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
          Add New Content
        </h2>

        <div className="space-y-4">
          <Input ref={titleRef} placeholder="Enter title" />
          <Input ref={linkRef} placeholder="Enter link" />
          <Input
            placeholder="Enter tags (comma separated)"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
          />
        </div>

        <div className="pt-4 space-y-1">
          <label className="block text-sm font-medium text-gray-700 pb-1">
            Select Type
          </label>
          <div className="flex flex-wrap gap-2">
            <Button
              text="YouTube"
              variant={type === ContentType.Youtube ? "primary" : "secondary"}
              onClick={() => setType(ContentType.Youtube)}
            />
            <Button
              text="Twitter"
              variant={type === ContentType.Twitter ? "primary" : "secondary"}
              onClick={() => setType(ContentType.Twitter)}
            />
            <Button
              text="Documents"
              variant={type === ContentType.Documents ? "primary" : "secondary"}
              onClick={() => setType(ContentType.Documents)}
            />
            <Button
              text="Links"
              variant={type === ContentType.Links ? "primary" : "secondary"}
              onClick={() => setType(ContentType.Links)}
            />
            <Button
              text="Tags"
              variant={type === ContentType.Tags ? "primary" : "secondary"}
              onClick={() => setType(ContentType.Tags)}
            />
          </div>
        </div>

        <div className="pt-6">
          <Button
            onClick={addContent}
            variant="primary"
            text="Submit"
            fullWidth
          />
        </div>
      </div>
    </div>
  );
};
