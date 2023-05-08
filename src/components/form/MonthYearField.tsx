import clsx from "clsx";
import { eachMonthOfInterval, isSameDay, addYears } from "date-fns";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Menu } from "@mui/material";
import { useState } from "react";

import { format } from "@/utils/format";

interface MonthPickerProps {
  placeholder: string;
  onSelect: (m: Date) => void;
}

export function MonthYearField({ placeholder, onSelect }: MonthPickerProps) {
  const [selected, setSelected] = useState<Date | null>(null);

  const [anchorDate, setAnchorDate] = useState(new Date());

  const monthsOfYear = eachMonthOfInterval({
    start: new Date(anchorDate.getFullYear(), 0, 1),
    end: new Date(anchorDate.getFullYear(), 11, 31),
  });

  function increaseAnchorYear() {
    setAnchorDate(addYears(anchorDate, 1));
  }

  function decreaseAnchorYear() {
    setAnchorDate(addYears(anchorDate, -1));
  }

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
      <div className="flex gap-2">
        <button
          onClick={handleClick}
          className="px-4 py-2 rounded ring-1 ring-inset ring-gray-300 text-gray-500 flex items-center gap-4"
        >
          <CalendarMonthIcon fontSize="small" />
          <span>
            {selected
              ? format.monthYear(selected.toISOString())
              : "Select date"}
          </span>
        </button>
      </div>

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
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div className="min-w-[280px]">
          <div className="flex justify-between py-4 border-b border-slate-300 px-4">
            <button
              onClick={decreaseAnchorYear}
              className="p-1 ring-1 ring-inset ring-slate-300 text-slate-500 rounded-lg hover:ring-slate-800"
            >
              <KeyboardArrowLeftIcon />
            </button>
            <span className="text-lg font-medium">
              {anchorDate.getFullYear()}
            </span>
            <button
              onClick={increaseAnchorYear}
              className="p-1 ring-1 ring-inset ring-slate-300 text-slate-500 rounded-lg hover:ring-slate-800"
            >
              <KeyboardArrowRightIcon />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 p-4">
            {monthsOfYear.map((m) => (
              <button
                key={m.toISOString()}
                className={clsx("p-2 rounded-lg", {
                  "bg-teal-400 text-white": selected && isSameDay(selected, m),
                  "hover:bg-slate-200": !isSameDay(selected || new Date(), m),
                })}
                onClick={() => {
                  setSelected(m);
                  onSelect(m);
                  handleClose();
                }}
              >
                {format.month(m.toISOString())}
              </button>
            ))}
          </div>
        </div>
      </Menu>
    </div>
  );
}
