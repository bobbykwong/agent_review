import clsx from "clsx";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";

export interface StarProps {
  colored: boolean;
  size?: "sm" | "lg";
}

export function Star({ colored, size = "sm" }: StarProps) {
  return colored ? (
    <StarRoundedIcon
      className={clsx("!text-teal-400", {
        "!text-5xl": size === "lg",
        "!text-2xl": size === "sm",
      })}
    />
  ) : (
    <StarOutlineRoundedIcon
      className={clsx({
        "!text-5xl": size === "lg",
        "!text-xl": size === "sm",
      })}
    />
  );
}
