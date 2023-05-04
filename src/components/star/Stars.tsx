import _ from "lodash";

import { Star, StarProps } from "./Star";

interface StarsProps {
  numStars: number;
  size: StarProps["size"];
}

export function Stars({ numStars, size = "sm" }: StarsProps) {
  return (
    <div>
      {_.range(numStars).map((i) => (
        <Star key={i} colored size={size} />
      ))}
    </div>
  );
}
