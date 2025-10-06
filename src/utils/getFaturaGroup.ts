import { format } from "date-fns";
import { GroupCalendar } from "../types/GroupCalendar";

function getDateGroup(date: Date, groupType: GroupCalendar): string {
  switch (groupType) {
    case "day":
      return format(date, "yyyy-MM-dd");
    case "month":
      return format(date, "yyyy-MM");
    case "year":
      return format(date, "yyyy");
    default:
      return format(date, "yyyy-MM-dd");
  }
}

export default getDateGroup;
