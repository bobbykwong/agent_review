import _ from "lodash";
import { format as DFNFormat, differenceInYears } from "date-fns";

export const format = {
  titleCase: (s: string) =>
    s.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
    ),
  yearsBetween: (endDt: string, startDt: string) =>
    differenceInYears(new Date(endDt), new Date(startDt)),
  fullDate: (dt: string) => DFNFormat(new Date(dt), "dd MMM yyyy"),
};
