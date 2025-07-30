import type { ReactElement } from "react";

type Variants = "primary" | "secondary";

interface ButtonProps {
  variant: Variants;
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantStyles = {
  primary:
    "bg-[#5046e4] text-white hover:bg-[#3f3ac0] transition-colors duration-200 ease-in-out",
  secondary:
    "bg-[#e0e7ff] text-[#6861d6] hover:bg-[#d5dbff] transition-colors duration-200 ease-in-out",
};

const defaultStyles = "px-4 py-2.5 rounded-md font-normal flex items-center";

export const Button = ({
  variant,
  text,
  startIcon,
  onClick,
  fullWidth,
  loading,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${variantStyles[variant]} ${defaultStyles} ${
        fullWidth ? "w-full flex justify-center items-center" : ""
      } ${loading ? "opacity-45" : "cursor-pointer"}`}
      disabled={loading}
    >
      <div className="pr-2">{startIcon}</div>
      {text}
    </button>
  );
};
