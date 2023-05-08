import _ from "lodash";
import { TextField } from "@mui/material";
import { useState } from "react";

import { Button } from "@/components/button";
import { MonthYearField, RatingField } from "@/components/form";
import { Salesperson } from "@/features/salespersons";

import { useCreateReview } from "../api/createReview";

interface CreateReviewProps {
  salespersonId: Salesperson["id"];
}

export function CreateReview({ salespersonId }: CreateReviewProps) {
  const [experiencedAt, setExperiencedAt] = useState<Date | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const [errMsg, setErrMsg] = useState<string | null>(null);

  const createReviewMutation = useCreateReview({ salespersonId });

  function handleSubmit() {
    if (!experiencedAt || !rating || !msg) {
      setErrMsg("All fields required");
      return;
    }

    createReviewMutation.trigger({
      salespersonId,
      experiencedAt: experiencedAt.toISOString(),
      rating,
      msg,
    });
  }

  return (
    <div className="max-w-[500px] mx-auto p-8 bg-white rounded-2xl shadow">
      <div className="flex flex-col gap-8">
        <div>
          <Label>Date of experience</Label>
          <MonthYearField
            onSelect={(m) => setExperiencedAt(m)}
            placeholder="Select date"
          />
        </div>
        <div>
          <Label>Rate your experience</Label>
          <RatingField onSelect={(rating) => setRating(rating)} />
        </div>
        <div>
          <Label>Tell us more about your experience</Label>
          <TextField
            value={msg || ""}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="We value your opinion! Share your thoughts about this agent's services."
            multiline
            rows={10}
          />
        </div>
        <div className="h-8">
          {errMsg && <p className="text-red-500">{errMsg}</p>}
        </div>
        <div className="mx-auto">
          <Button
            onClick={handleSubmit}
            isLoading={createReviewMutation.isMutating}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

interface LabelProps {
  children: string;
}

function Label({ children }: LabelProps) {
  return <h2 className="font-semibold text-lg mb-2">{children}</h2>;
}
