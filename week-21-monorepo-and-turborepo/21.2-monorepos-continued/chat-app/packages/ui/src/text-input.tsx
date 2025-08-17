import { RefObject } from "react";

interface InputProps {
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: RefObject<HTMLInputElement | null>;
  classname?: string;
}

export function TextInput({
  placeholder,
  onChange,
  inputRef,
  classname,
}: InputProps) {
  return (
    <input
      className={classname}
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      ref={inputRef}
    />
  );
}
