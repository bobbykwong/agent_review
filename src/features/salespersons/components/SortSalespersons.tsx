import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";

import { APISort } from "@/api/types";
import { Button } from "@/components/button";

interface SortSalespersonsProps {
  sort: APISort;
  addSortItem: (sortItem: string) => void;
  removeSortItem: () => void;
}

export function SortSalespersons({
  sort,
  addSortItem,
  removeSortItem,
}: SortSalespersonsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClick}>Sort by</Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            addSortItem("numTransactions_desc");
            handleClose();
          }}
        >
          Number of transactions
        </MenuItem>
        <MenuItem
          onClick={() => {
            addSortItem("registrationStartDate_asc");
            handleClose();
          }}
        >
          Experience
        </MenuItem>
        <MenuItem onClick={handleClose}>Rating</MenuItem>
      </Menu>
    </div>
  );
}
