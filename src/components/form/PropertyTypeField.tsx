import clsx from "clsx";
import Button from '@mui/material/Button';
import { Menu } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import { useState } from "react";

import { format } from "@/utils/format";

interface PropertyTypeProps {
  propertyType: string | null;
  setPropertyType: (value: string | null) => void
}


export function PropertyTypeField({propertyType, setPropertyType}: PropertyTypeProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
    ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
    ) => {
    setSelectedIndex(index);
    setAnchorEl(null);

    setPropertyType(options[index])
  };

  const options = [
    "Not selected",
    "HDB",
    "Private"
  ]

  return (
    <div>
        <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleButtonClick}
            className="px-4 py-2 rounded ring-1 ring-inset ring-gray-300 flex text-gray-500 items-center gap-4"
        >
            <HomeIcon fontSize="small" className="text-gray-500"/>
            <span className="text-gray-500">
            {selectedIndex
                ? options[selectedIndex]
                : "Select type"
            }
            </span>
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
            {options.map((option, index) => (
                <MenuItem
                    key={option}
                    disabled={index === 0}
                    selected={index === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                >
                {option}
                </MenuItem>
            ))}
        </Menu>
    </div>
  )
}
