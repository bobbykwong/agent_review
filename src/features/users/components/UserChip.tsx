import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";

import { Spinner } from "@/components/spinner";

import { useUser } from "../api/getUser";
import { User } from "../types";
import { useAuthStore } from "@/features/authentication";

interface UserChipProps {
  id: User["id"];
}
export function UserChip({ id }: UserChipProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = useAuthStore((s) => s.logout);
  const userQuery = useUser({ id });

  if (!userQuery.data) return <Spinner />;

  return (
    <>
      <button className="rounded-full" onClick={handleClick}>
        <img
          src={userQuery.data.photoURL}
          className="w-10 h-10 rounded-full"
          referrerPolicy="no-referrer"
        />
      </button>
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
            logout();
            handleClose();
          }}
        >
          Log out
        </MenuItem>
      </Menu>
    </>
  );
}
