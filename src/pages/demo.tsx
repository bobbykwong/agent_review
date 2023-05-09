import { Rating } from "@/components/rating";
import { useState } from "react";

export default function Page() {
  const [rating, setRating] = useState(3);
  return (
    <div>
      <Rating
        value={rating}
        size="sm"
        readOnly={false}
        onChange={(n) => setRating(n)}
      />
    </div>
  );
}
