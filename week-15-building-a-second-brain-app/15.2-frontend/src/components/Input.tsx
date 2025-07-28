export const Input = ({
  placeholder,
  ref,
  value,
  onChange,
}: {
  placeholder: string;
  ref?: React.Ref<HTMLInputElement>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="w-full">
      <input
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
      />
    </div>
  );
};
