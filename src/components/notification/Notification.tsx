import clsx from "clsx";
import { Snackbar, Slide, SlideProps } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import CloseIcon from "@mui/icons-material/Close";

import { useNotificationStore } from "@/stores/useNotificationStore";

const NOTIFICATION_DURATION = 8000;

export function Notification() {
  const notification = useNotificationStore((s) => s.notification);
  const dismiss = useNotificationStore((s) => s.dismiss);

  if (notification === null) return null;

  const { msg, status } = notification;
  const { icon, className } = statuses[status];

  return (
    <Snackbar
      open={true}
      onClose={dismiss}
      autoHideDuration={NOTIFICATION_DURATION}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ zIndex: 9000 }}
      TransitionComponent={SlideTransition}
    >
      <div
        className={clsx(
          "rounded-lg m-2 flex gap-8 px-4 py-2 max-w-screen-mobile text-white",
          className
        )}
      >
        <div className="flex gap-2">
          {icon}
          <span>{msg}</span>
        </div>

        <CloseIcon onClick={dismiss} className="cursor-pointer" />
      </div>
    </Snackbar>
  );
}

const statuses = {
  success: {
    icon: <CheckCircleIcon />,
    className: "bg-teal-400",
  },
  error: {
    icon: <WarningIcon />,
    className: "bg-red-400",
  },
};

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}
