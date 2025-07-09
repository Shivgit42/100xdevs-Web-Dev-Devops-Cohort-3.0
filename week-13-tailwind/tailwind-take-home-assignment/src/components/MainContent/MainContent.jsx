import banner from "../../assets/banner.png";
import profilePic from "../../assets/images.jpeg";
import webinar from "../../assets/webinar.svg";
import plus from "../../assets/plus.svg";
import recordings from "../../assets/recordings.svg";
import live from "../../assets/camcorder.svg";
import upcoming from "../../assets/camcorder-blue.svg";

export const MainContent = () => {
  return (
    <div className="w-full">
      <div>
        <img src={banner} className="w-full h-40 hidden md:block"></img>
      </div>

      <div className="grid grid-cols-9 p-8 gap-6">
        {/* first child */}
        <div className="col-span-10 hidden md:block p-12 mt-14 md:col-span-2 h-80 -translate-y-32 rounded-2xl shadow-2xl relative z-10 bg-white">
          <div className="flex justify-center items-center">
            <img className="w-28 h-28 rounded-xl" src={profilePic} alt="" />
          </div>
          <div className="flex justify-center items-center pt-4">
            <h2 className="font-bold text-xl">Billie Eilish</h2>
          </div>
          <div className="flex flex-col py-3 justify-center items-center text-slate-500 gap-1">
            <span>billie@gmail.com</span>
            <span>929383829</span>
          </div>
          <div className="flex justify-center items-center text-slate-500">
            <p>Delhi, India</p>
          </div>
        </div>
        {/* 2nd child */}

        <div className="col-span-10 md:col-span-4 flex flex-col gap-4">
          {/* Heading section */}
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-500">Monday, 14 October</p>
            <h1 className="text-2xl font-bold text-blue-950">
              Good Morning, Billie! <span className="inline-block">👋</span>
            </h1>
          </div>

          {/* Webinar Schedule Card */}
          <div className="bg-white rounded-2xl shadow-2xl">
            {/* Heading */}
            <div className="flex items-center justify-between bg-slate-100 p-4 text:sm font-semibold ">
              <div className="flex items-center gap-3">
                <span className="text-xl">📅</span>
                <span className="text-lg">Monday, 14 October 2024</span>
              </div>
              <div className="flex items-center gap-2 text-2xl text-gray-500">
                <button>←</button>
                <button>→</button>
              </div>
            </div>

            {/* List */}
            <div className="p-4 space-y-4 text-sm">
              {/* Row */}
              <div className="flex items-start border-b border-b-slate-300 gap-4 pb-3">
                <div className="text-start py-2">
                  <p className="text-lg font-semibold">11:30 AM</p>
                  <p className="text-xs text-slate-400">11:30 AM</p>
                </div>
                <div className="border-l-1 border-green-400 pl-3">
                  <div className="flex items-center gap-2 text-xs font-semibold mb-0.5">
                    <span className="text-gray-500">Live</span>
                    <img
                      src={live}
                      className=" w-5 h-5 transform -scale-x-100"
                    />
                  </div>
                  <p className="text-lg font-semibold">UX Webinar</p>
                </div>
              </div>

              {/* More Rows */}
              {["My first Webinar", "Important webinar", "Webinar 1"].map(
                (title, index) => (
                  <div
                    key={index}
                    className="flex items-start border-b border-b-slate-300 gap-4 pb-3"
                  >
                    <div className="text-start py-2">
                      <p className="text-lg font-semibold">11:30 AM</p>
                      <p className="text-xs text-slate-400">11:30 AM</p>
                    </div>
                    <div className="border-l-1 border-green-400 pl-3">
                      <div className="flex items-center gap-2 text-xs font-semibold mb-0.5">
                        <span className="text-gray-500">Upcoming</span>
                        <img
                          src={upcoming}
                          className=" w-5 h-5 transform -scale-x-100"
                        />
                      </div>
                      <p className="text-lg font-semibold">{title}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* 3rd child */}
        <div className=" col-span-10 md:col-span-3 h-64 bg-white p-6 grid grid-cols-2 gap-10 max-w-sm rounded-2xl shadow-2xl">
          {/* Schedule a webinar */}
          <div className="flex flex-col items-center gap-2">
            <div className="bg-cyan-400 rounded-lg flex items-center justify-center text-xl w-14 h-14">
              <img className="px-3 py-2" src={webinar} alt="" />
            </div>
            <p className="text-xs font-bold text-center">Schedule a Webinar</p>
          </div>
          {/* Join a webinar */}
          <div className="flex flex-col items-center gap-2">
            <div className="bg-cyan-400 rounded-lg flex items-center justify-center text-xl w-14 h-14">
              <img className="px-3 py-2 " src={plus} alt="" />
            </div>
            <p className="text-xs font-bold text-center">Join a Webinar</p>
          </div>
          {/* Open recordings */}
          <div className="flex flex-col items-center gap-2">
            <div className="bg-cyan-400 rounded-lg flex items-center justify-center text-xl w-14 h-14">
              <img className="px-3 py-2 " src={recordings} alt="" />
            </div>
            <p className="text-xs font-bold text-center">Open recordings</p>
          </div>
        </div>
      </div>
    </div>
  );
};
