export const Input = ({ onClick, type, placeholder, value, onChange }) => {
  return (
    <div onClick={onClick} className={`w-[320px] rounded-2xl mb-6`}>
      <input
        type={type}
        placeholder={placeholder}
        className=" w-full bg-[#183f6a] text-white text-lg rounded-xl px-4 py-3 outline-none"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
