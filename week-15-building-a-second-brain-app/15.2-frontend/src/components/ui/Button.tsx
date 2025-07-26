import type { ReactElement } from "react";

type Variants = "primary" | "secondary";

interface ButtonProps {
  variant: Variants;
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
}

const variantStyles = {
  primary: "bg-[#5046e4] text-white",
  secondary: "bg-[#e0e7ff] text-[#4842af]",
};

const sizeStyles = {
  sm: "py-1 px-2 text-sm rounded-sm",
  md: "py-2 px-4 text-lg rounded-md",
  lg: "py-3 px-6 text-lg rounded-lg",
};

export const Button = (props: ButtonProps) => {
  return (
    <div className="flex justify-end gap-4 p-4">
      <button
        className={`${variantStyles[props.variant]} ${
          sizeStyles[props.size]
        } flex gap-3`}
      >
        <div className="flex items-center justify-center">
          {props.startIcon}
          <div className="pl-3 pr-3">{props.text}</div>
        </div>
      </button>
    </div>
  );
};
