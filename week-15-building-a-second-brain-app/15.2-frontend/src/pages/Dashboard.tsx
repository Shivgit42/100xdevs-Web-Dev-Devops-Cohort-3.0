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
import { MenuIcon, Moon, Sun } from "lucide-react";
import toast from "react-hot-toast";
import { Sheet, SheetTrigger, SheetContent } from "../components/ui/sheet";

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

  const filteredContents = localContents.filter((item) => {
    if (filterType === "tag" && selectedTag) {
      return item.tags.some((tag) => tag.title === selectedTag);
    } else if (filterType) {
      return item.type === filterType;
    }
    return true;
  });

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
    <div className="min-h-screen flex flex-col md:flex-row overflow-x-hidden">
      {/* Sidebar for Desktop */}
      <div className="hidden md:block">
        <Sidebar onSelectType={setFilterType} selectedType={filterType} />
      </div>

      {/* Main Content */}
      <div className="p-4 md:pl-9 md:ml-72 min-h-screen bg-[#f9fafb] dark:bg-gray-900 dark:text-white w-full overflow-x-hidden">
        <CreateContentModel
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        {/* Mobile Sidebar using Sheet (for mobile) */}
        <div className="md:hidden mb-2">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                <MenuIcon className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[260px] p-4">
              <Sidebar onSelectType={setFilterType} selectedType={filterType} />
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sticky top-0 bg-[#f9fafb] dark:bg-gray-900 z-10 py-4 px-3 shadow-sm">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-500 to-indigo-600 text-transparent bg-clip-text">
            {filterType
              ? `${
                  filterType.charAt(0).toUpperCase() + filterType.slice(1)
                } Notes`
              : "All Notes"}
          </h1>

          <div className="flex items-center gap-2 mt-4 sm:mt-0 sm:gap-4 flex-wrap">
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
              onClick={() => setModalOpen(true)}
              variant="primary"
              text="Add Content"
              startIcon={<PlusIcon />}
            />
          </div>
        </div>

        {/* Tag Filters */}
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

        {/* Content Grid */}
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
  toast(
    <div className="text-white bg-indigo-600 rounded-xl px-4 py-3 shadow-md">
      Your second brain is live! 🔗 Link copied - share your ideas with the
      world.
    </div>,
    {
      duration: 5000,
      style: {
        background: "transparent",
        boxShadow: "none",
      },
    }
  );
};
