import { useEffect } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";

type CardType = "twitter" | "youtube";

interface Tag {
  _id: string;
  title: string;
}

interface CardProps {
  title: string;
  link: string;
  type: CardType;
  tags: Tag[];
}

export const Card = ({ title, link, tags, type }: CardProps) => {
  useEffect(() => {
    if (type === "twitter") {
      (window as any).twttr?.widgets?.load();
    }
  }, [type, link]);

  return (
    <div>
      <div className="bg-white p-4 border-gray-200 rounded-md max-w-72 min-h-48 min-w-72 border shadow-sm">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="text-gray-500 flex-flex-shrink-0">
              {type === "twitter" ? (
                <TwitterIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <YoutubeIcon className="w-5 h-5 text-gray-500" />
              )}
            </div>
            <span className="text-md font-medium">{title}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <div className="pr-4">
              <a href={link} target="_blank">
                <ShareIcon />
              </a>
            </div>
            <DeleteIcon />
          </div>
        </div>
        <div className="pt-4">
          {type === "youtube" && (
            <iframe
              className="w-full mb-2"
              src={link.replace("watch", "embed").replace("?v=", "/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          {type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
          {tags && tags.length > 0 && (
            <div className="pt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag._id}
                  className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded"
                >
                  #{tag.title}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
