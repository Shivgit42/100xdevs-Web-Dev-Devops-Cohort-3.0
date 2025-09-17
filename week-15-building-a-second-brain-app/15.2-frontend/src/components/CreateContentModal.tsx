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

  // tag input value (what user is typing)
  const [tagInput, setTagInput] = useState("");
  // actual tags array
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setTagInput("");
      setTags([]);
      if (titleRef.current) titleRef.current.value = "";
      if (linkRef.current) linkRef.current.value = "";
      setType(ContentType.Youtube);
    }
  }, [open]);

  const addContent = async () => {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

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

  // parse tokens from input and add them as tags
  const commitTagsFromInput = () => {
    const raw = tagInput.trim();
    if (!raw) return;

    // split by commas or whitespace (handles multiple tags typed together)
    const tokens = raw
      .split(/[\s,]+/)
      .map((t) => t.trim())
      .filter(Boolean);
    if (tokens.length === 0) {
      setTagInput("");
      return;
    }

    setTags((prev) => {
      const uniqueNew = tokens.filter((t) => !prev.includes(t));
      return [...prev, ...uniqueNew];
    });
    setTagInput("");
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    // commit when user presses Enter, comma or space
    if (key === "Enter" || key === "," || key === " ") {
      e.preventDefault();
      commitTagsFromInput();
      return;
    }

    // backspace behavior: if input empty, remove last tag
    if (key === "Backspace" && tagInput === "" && tags.length > 0) {
      e.preventDefault();
      setTags((prev) => prev.slice(0, -1));
    }
  };

  const removeTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
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
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition cursor-pointer"
            aria-label="Close"
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

          {/* TAG INPUT */}
          <div>
            <label className="text-sm text-gray-700 mb-2 block">Tags</label>
            <Input
              placeholder="Type tag and press comma / space / enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className="w-full rounded-md border-gray-200 px-3 py-2"
            />

            {/* tags list (chips) */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((t, idx) => (
                  <div
                    key={`${t}-${idx}`}
                    className="flex items-center gap-1 bg-gray-100 text-sm text-gray-800 rounded-full px-3 py-1"
                  >
                    <span>{t}</span>
                    <button
                      onClick={() => removeTag(idx)}
                      className="p-0.5 rounded hover:bg-gray-200"
                      aria-label={`Remove tag ${t}`}
                    >
                      <CrossIcon className="size-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Type selector */}
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
