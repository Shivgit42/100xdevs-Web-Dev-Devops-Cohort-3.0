import axios from "axios";
import { BACKEND_URL } from "../config";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";

export const ViewBrain = () => {
  const { shareLink } = useParams();
  const [username, setUsername] = useState("");
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/brain/${shareLink}`
        );
        setUsername(response.data.username);
        setContents(response.data.content);
      } catch (error) {
        console.error("Error loading share brain", error);
        setError("Failed to load shared content");
      } finally {
        setLoading(false);
      }
    };
    if (shareLink) {
      fetchSharedContent();
    }
  }, [shareLink]);

  if (loading) return <div className="p-6">Loading shared brain...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-2 text-center">
        {username} Shared Brain 🧠
      </h1>
      {contents.length === 0 ? (
        <div>No content available.</div>
      ) : (
        <div className="flex flex-wrap gap-4 pt-6">
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
      )}
    </div>
  );
};
