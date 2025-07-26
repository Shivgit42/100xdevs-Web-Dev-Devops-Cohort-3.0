import Brain from "../icons/brain.svg";
import Twitter from "../icons/twitter.svg";
import Video from "../icons/video.svg";
import Documents from "../icons/documents.svg";
import Links from "../icons/links.svg";
import Hashtag from "../icons/hashtag.svg";

export const Sidebar = () => {
  return (
    <div className="w-72 h-screen bg-gray-300">
      <div className="flex gap-2 text-xl items-center p-4 mb-8">
        <img className="size-14" src={Brain} alt="" />
        <h1 className="font-semibold">Second Brain</h1>
      </div>
      <div className="flex flex-col ml-8 gap-6">
        <div className="flex gap-3 text-lg items-center text-center">
          <img className="size-6" src={Twitter} alt="" />
          <span className="text-gray-500">Tweets</span>
        </div>
        <div className="flex gap-3 text-lg items-center text-center">
          <img className="size-6" src={Video} alt="" />
          <span className="text-gray-500">Videos</span>
        </div>
        <div className="flex gap-3 text-lg items-center text-center">
          <img className="size-6" src={Documents} alt="" />
          <span className="text-gray-500">Documents</span>
        </div>
        <div className="flex gap-3 text-lg items-center text-center">
          <img className="size-6" src={Links} alt="" />
          <span className="text-gray-500">Links</span>
        </div>
        <div className="flex gap-3 text-lg items-center text-center">
          <img className="size-6" src={Hashtag} alt="" />
          <span className="text-gray-500">Tags</span>
        </div>
      </div>
    </div>
  );
};
