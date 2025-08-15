import { RefObject } from "react";

interface InputProps {
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: RefObject<HTMLInputElement | null>;
}

export function TextInput({ placeholder, onChange, inputRef }: InputProps) {
  return (
    <input
      style={{
        padding: "10px",
        margin: "10px",
        borderColor: "black",
        borderWidth: "1px",
      }}
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      ref={inputRef}
    />
  );
}
