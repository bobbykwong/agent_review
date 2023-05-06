import _ from "lodash";
import {
  format as DFNFormat,
  differenceInYears,
  formatDistanceToNow,
} from "date-fns";

import { Transaction } from "@/features/transactions";

export const format = {
  number: (n: number) => n.toLocaleString(),
  timeAgo: (dt: string) => `${formatDistanceToNow(new Date(dt))} ago`,
  titleCase: (s: string) =>
    s.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
    ),
  propertyType: (s: Transaction["propertyType"]) => {
    switch (s) {
      case "HDB":
        return "HDB";
      case "CONDOMINIUM_APARTMENTS":
        return "Condominium";
      case "LANDED":
        return "Landed";
      case "STRATA_LANDED":
        return "Strata Landed";
      case "EXECUTIVE_CONDOMINIUM":
        return "Executive Condominium";
    }
  },
  yearsBetween: (endDt: string, startDt: string) =>
    differenceInYears(new Date(endDt), new Date(startDt)),
  monthYear: (dt: string) => DFNFormat(new Date(dt), "MMM yyyy"),
  fullDate: (dt: string) => DFNFormat(new Date(dt), "dd MMM yyyy"),
};
