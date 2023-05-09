import _ from "lodash";

import { Rating } from "@/components/rating";

interface RatingField {
  value: number;
  onChange: (rating: number) => void;
}

export function RatingField({ value, onChange }: RatingField) {
  return (
    <Rating value={value} onChange={onChange} readOnly={false} size="lg" />
  );
}
