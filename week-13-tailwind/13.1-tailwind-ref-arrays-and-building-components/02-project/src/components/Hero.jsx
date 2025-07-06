import webinarImage from "../assets/webinar.png";

export const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4">
      {/* Logo and Brand Name */}
      <div className="flex gap-3 items-center">
        <img className="w-10 h-10" src={webinarImage} alt="Webinar Logo" />
        <div className="flex text-2xl font-semibold">
          <span className="text-green-400 ">Webinar</span>
          <span className="text-white ml-1">.gg</span>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-white font-bold text-2xl mt-14 mb-8">
        Verify your Age
      </h2>

      {/* Subtitle */}
      <p className="text-gray-300 mt-4 mb-2 text-sm max-w-sm">
        Please confirm your birth year. This data will not be stored.
      </p>
    </div>
  );
};
