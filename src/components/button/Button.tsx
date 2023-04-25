import clsx from "clsx";
import { ButtonHTMLAttributes, ReactElement } from "react";

import { Spinner } from "@/components/spinner";

const variants = {
  primary: "bg-teal-400 text-white shadow-sm",
};

const sizes = {
  sm: "py-1 px-2 text-sm",
  md: "py-[6px] px-4 text-md",
  lg: "py-3 px-8 text-lg",
};

interface IconProps {
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    IconProps {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
}

export function Button({
  type = "button",
  className = "",
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        "flex justify-center items-center disabled:cursor-not-allowed focus:outline-none hover:opacity-80",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading && <Spinner size="sm" />}
      {!isLoading && leftIcon}
      <span className="mx-2">{props.children}</span>
      {!isLoading && rightIcon}
    </button>
  );
}
