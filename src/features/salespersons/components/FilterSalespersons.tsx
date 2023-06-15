import { TextField } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import IconButton from '@mui/material/IconButton';
import { useEffect, useState,  } from "react";
import { useRouter } from 'next/router'

import { APIFilter } from "@/api/types";
import Link from "next/link";

interface FilterSalespersonsProps {
  filter: APIFilter;
  addFilterItems: (f: APIFilter) => void;
}

export function FilterSalespersons({
  filter,
  addFilterItems,
}: FilterSalespersonsProps) {
  const [name, setName] = useState(filter.name);

  const router = useRouter();

  const handleSearch = () => {
    addFilterItems({ name });
    router.push(`?name=${name}`)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
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
              onClick={() => {
                handleSearch()
              }}
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
