import clsx from "clsx";
import { Rating as MUIRating } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

interface RatingProps {
  value: number;
  size: "lg" | "sm";
  readOnly: boolean;
  onChange?: (newValue: number) => void;
}

export function Rating({ value, size, readOnly, onChange }: RatingProps) {
  return (
    <MUIRating
      value={value}
      precision={readOnly ? 0.5 : 1}
      readOnly={readOnly}
      icon={
        <StarRoundedIcon
          fontSize="inherit"
          className={clsx("text-teal-400", {
            "!text-5xl": size === "lg",
            "!text-xl": size === "sm",
          })}
        />
      }
      onChange={(_, newValue) => {
        const typedNewValue = newValue as number;
        onChange && onChange(typedNewValue);
      }}
      emptyIcon={
        <StarRoundedIcon
          fontSize="inherit"
          className={clsx("text-gray-300", {
            "!text-5xl": size === "lg",
            "!text-xl": size === "sm",
          })}
        />
      }
    />
  );
}
