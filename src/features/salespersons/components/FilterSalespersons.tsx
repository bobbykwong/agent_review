import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

import { APIFilter } from "@/api/types";

interface FilterSalespersonsProps {
  filter: APIFilter;
  addFilterItems: (f: APIFilter) => void;
}

export function FilterSalespersons({
  filter,
  addFilterItems,
}: FilterSalespersonsProps) {
  const [name, setName] = useState(filter.name);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!name) {
        return;
      } else {
        addFilterItems({ name });
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [name]);

  return (
    <div className="w-full max-w-[400px]">
      <TextField
        autoFocus
        label="Agent name"
        placeholder="Search agent by name"
        sx={{ backgroundColor: "white" }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}
