import _ from "lodash";
import { TextField } from "@mui/material";
import { useState } from "react";

import { Button } from "@/components/button";
import { MonthYearField, RatingField, PropertyTypeField, TransactionTypeField } from "@/components/form";
import { Salesperson } from "@/features/salespersons";

import { useCreateReview } from "../api/createReview";

interface CreateReviewProps {
  salespersonId: Salesperson["id"];
}

export function CreateReview({ salespersonId }: CreateReviewProps) {
  const [experiencedAt, setExperiencedAt] = useState<Date | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [propertyType, setPropertyType] = useState<string | null>(null);
  const [transactionType, setTransactionType] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const [errMsg, setErrMsg] = useState<string | null>(null);

  const createReviewMutation = useCreateReview({ salespersonId });

  function handleSubmit() {
    if (!experiencedAt || !rating || !msg ||!propertyType ||!transactionType) {
      setErrMsg("All fields required");
      return;
    }

    if(propertyType === "Not selected") {
      setErrMsg("All fields required");
      return;
    }

    createReviewMutation.trigger({
      salespersonId,
      experiencedAt: experiencedAt.toISOString(),
      rating,
      propertyType,
      transactionType,
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
          <Label>Property Type</Label>
          <PropertyTypeField
            propertyType = {propertyType}
            setPropertyType = {setPropertyType}
          />
        </div>
        <div>
          <Label>Transaction Type</Label>
          <TransactionTypeField 
            transactionType = {transactionType}
            setTransactionType = {setTransactionType}
          />
        </div>
        <div>
          <Label>Rate your experience</Label>
          <RatingField
            value={rating ? rating : 0}
            onChange={(rating) => setRating(rating)}
          />
        </div>
        <div>
          <Label>Tell us more about your experience</Label>
          <TextField
            value={msg || ""}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Do give honest, detailed and constructive feedback about your experience with the property Agent. Remember to be friendly and courteous when doing so!"
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
