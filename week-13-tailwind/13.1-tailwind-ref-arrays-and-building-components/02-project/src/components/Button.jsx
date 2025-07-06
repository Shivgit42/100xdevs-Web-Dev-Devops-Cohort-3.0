export const Button = ({ disabled, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-[320px] bg-[#7f95ac] rounded-xl px-4 py-3 text-white text-lg font-semibold ${
        disabled
          ? "opacity-70 cursor-not-allowed"
          : "bg-green-300 cursor-pointer"
      } `}
    >
      {children}
    </button>
  );
};
