import { TextField } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import IconButton from '@mui/material/IconButton';
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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addFilterItems({ name });
    }
  };

  return (
    <TextField
      autoFocus
      placeholder="Agent Name"
      sx={{ backgroundColor: "white" }}
      value={name || ""}
      onChange={(e) => setName(e.target.value)}
      InputProps={{
        startAdornment: (
          <div className="pr-4 text-gray-600">
            <IconButton
              onClick={() => {addFilterItems({ name })}}
            >
              <SearchRoundedIcon />
            </IconButton>
          </div>
        ),
        onKeyDown: handleKeyPress
      }}
    />
  );
}
