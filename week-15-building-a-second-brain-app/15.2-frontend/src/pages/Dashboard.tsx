import { useEffect, useMemo, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModel } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

interface Tag {
  _id: string;
  title: string;
}

interface Content {
  _id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube" | "document" | "link" | "tag";
  tags: Tag[];
}

export const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();
  const [localContents, setLocalContents] = useState<Content[]>(contents);
  const [filterType, setFilterType] = useState<
    "twitter" | "youtube" | "document" | "link" | "tag" | null
  >(null);
  const [theme, setTheme] = useState("light");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    return [
      ...new Set(
        localContents.flatMap((item) => item.tags.map((tag) => tag.title))
      ),
    ];
  }, [localContents]);

  useEffect(() => {
    if (filterType === "tag" && allTags.length > 0 && !selectedTag) {
      setSelectedTag(allTags[0]);
    }
  }, [filterType, allTags, selectedTag]);

  useEffect(() => {
    setLocalContents(contents);
  }, [contents]);

  useEffect(() => {
    if (!modalOpen) {
      refresh();
    }
  }, [modalOpen]);

  const handleDeleteCard = (id: string) => {
    setLocalContents((prev) => prev.filter((item) => item._id !== id));
  };

  const filteredContents =
    filterType === "tag" && selectedTag
      ? localContents.filter((item) =>
          item.tags.some((tag) => tag.title === selectedTag)
        )
      : filterType
      ? localContents.filter((item) => item.type === filterType)
      : localContents;

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  return (
    <div>
      <Sidebar onSelectType={setFilterType} selectedType={filterType} />
      <div className="ml-72 p-4 pl-9 min-h-screen bg-[#f9fafb] dark:bg-gray-900 dark:text-white ">
        <CreateContentModel
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="flex justify-between mb-8 sticky top-0 bg-[#f9fafb] dark:bg-gray-900 z-10 py-4 px-3">
          <div className="flex justify-center items-center">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-puple-500 to-indigo-600 text-transparent bg-clip-text ">
              {filterType
                ? `${
                    filterType.charAt(0).toUpperCase() + filterType.slice(1)
                  } Notes`
                : "All Notes"}
            </h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 shadow-md shadow-purple-400 cursor-pointer text-gray-600 hover:text-purple-400 transition-all ease-in-out dark:bg-white dark:shadow-amber-400 dark:hover:text-amber-400"
            >
              {theme === "light" ? <Moon /> : <Sun />}
            </button>

            <Button
              onClick={handleShare}
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
        </div>

        {filterType === "tag" && (
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              ...new Set(
                localContents.flatMap((item) =>
                  item.tags.map((tag) => tag.title)
                )
              ),
            ].map((tagTitle) => (
              <button
                key={tagTitle}
                onClick={() => setSelectedTag(tagTitle)}
                className={`px-3 py-1 rounded-full cursor-pointer hover:bg-slate-300 border text-sm transition-all ${
                  selectedTag === tagTitle
                    ? "bg-purple-500 text-white dark:hover:bg-fuchsia-950"
                    : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-indigo-500"
                }`}
              >
                #{tagTitle}
              </button>
            ))}
          </div>
        )}

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredContents.map(({ _id, title, link, tags, type }) => (
            <motion.div
              key={_id}
              className="break-inside-avoid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                id={_id}
                title={title}
                link={link}
                tags={tags}
                type={type}
                onDelete={handleDeleteCard}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const handleShare = async () => {
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
};
