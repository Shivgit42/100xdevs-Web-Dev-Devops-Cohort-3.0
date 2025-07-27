import type { ReactElement } from "react";

type Variants = "primary" | "secondary";

interface ButtonProps {
  variant: Variants;
  text: string;
  startIcon: ReactElement;
  onClick?: () => void;
}

const variantStyles = {
  primary: "bg-[#5046e4] text-white",
  secondary: "bg-[#e0e7ff] text-[#6861d6]",
};

const defaultStyles =
  "px-4 py-2 rounded-md font-normal flex items-center cursor-pointer";

export const Button = ({ variant, text, startIcon, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${variantStyles[variant]} ${defaultStyles}`}
    >
      <div className="pr-2">{startIcon}</div>
      {text}
    </button>
  );
};
