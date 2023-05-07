import _ from "lodash";
import { useState } from "react";

import { Star } from "@/components/star";

interface RatingField {
  onSelect: (rating: number) => void;
}

export function RatingField({ onSelect }: RatingField) {
  const [rating, setRating] = useState<number | null>(null);
  return (
    <div>
      {_.range(5).map((i) => (
        <button
          key={i}
          onClick={() => {
            setRating(i + 1);
            onSelect(i + 1);
          }}
        >
          <Star colored={rating && i < rating ? true : false} size="lg" />
        </button>
      ))}
    </div>
  );
}
