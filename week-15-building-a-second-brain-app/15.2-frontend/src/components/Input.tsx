export const Input = ({
  placeholder,
  type = "text",
  value,
  ref,
  onChange,
}: {
  placeholder: string;
  type?: string;
  value?: string;
  ref?: React.Ref<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="w-full">
      <input
        value={value}
        ref={ref}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        required
      />
    </div>
  );
};
