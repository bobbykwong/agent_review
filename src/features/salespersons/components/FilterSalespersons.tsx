import { APIFilter } from "@/api/types";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface FilterSalespersonsProps {
  addFilterItems: (f: APIFilter) => void;
}

export function FilterSalespersons({
  addFilterItems,
}: FilterSalespersonsProps) {
  const [name, setName] = useState("");

  // useEffect(() => {
  //   addFilterItems({ name });
  // }, [name]);

  return (
    <div className="w-[280px]">
      <TextField
        placeholder="Search agent by name"
        sx={{ backgroundColor: "white" }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}
