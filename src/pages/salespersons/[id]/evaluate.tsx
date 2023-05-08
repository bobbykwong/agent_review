import _ from "lodash";
import { TextField } from "@mui/material";
import { useState } from "react";

import { Button } from "@/components/button";
import { PageLayout } from "@/components/layout";
import { MonthYearField, RatingField } from "@/components/form";

export default function Page() {
  const [dateOfExperience, setDateOfExperience] = useState<Date | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const [errMsg, setErrMsg] = useState<string | null>(null);

  function handleSubmit() {
    if (!dateOfExperience || !rating || !msg) {
      setErrMsg("All fields required");
      return;
    }
    console.log("Form submitted", {
      dateOfExperience,
      rating,
      msg,
    });
  }

  return (
    <div className="bg-gray-100">
      <PageLayout>
        <div className="max-w-[500px] mx-auto p-8 bg-white rounded-2xl shadow">
          <div className="flex flex-col gap-8">
            <div>
              <Label>Date of experience</Label>
              <MonthYearField
                onSelect={(m) => setDateOfExperience(m)}
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
                fullWidth
              />
            </div>
            <div className="h-8">
              {errMsg && <p className="text-red-500">{errMsg}</p>}
            </div>
            <div className="mx-auto">
              <Button type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
}

interface LabelProps {
  children: string;
}

function Label({ children }: LabelProps) {
  return <h2 className="font-semibold text-lg mb-2">{children}</h2>;
}
