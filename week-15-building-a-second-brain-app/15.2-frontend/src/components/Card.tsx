import { ShareIcon } from "../icons/ShareIcon";

type CardType = "twitter" | "youtube";

interface CardProps {
  title: string;
  link: string;
  type: CardType;
}

export const Card = ({ title, link, type }: CardProps) => {
  return (
    <div>
      <div className="bg-white p-4 border-gray-200 rounded-md max-w-72 min-h-48 min-w-72 border shadow-sm">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="text-gray-500 pr-2">
              <ShareIcon />
            </div>
            {title}
          </div>
          <div className="flex items-center text-gray-500">
            <div className="pr-2">
              <a href={link} target="_blank">
                <ShareIcon />
              </a>
            </div>
            <ShareIcon />
          </div>
        </div>
        <div className="pt-4">
          {type === "youtube" && (
            <iframe
              className="w-full"
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
        </div>
      </div>
    </div>
  );
};
