import { type TimeRange } from "@/server/db/schema";
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";

// if start and end is not in the same year, return "YYYY-MM-DD HH:MM ~ YYYY-MM-DD HH:MM"
// if start and end is in the same year, return "MM-DD HH:MM ~ MM-DD HH:MM"
export const formatTimeRange = (timeRange: TimeRange) => {
  const start = new TZDate(timeRange.start, "Asia/Tokyo");
  const end = new TZDate(timeRange.end, "Asia/Tokyo");

  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  if (startYear !== endYear) {
    return {
      start: format(start, "yyyy-MM-dd HH:mm"),
      end: format(end, "yyyy-MM-dd HH:mm"),
    };
  } else {
    return {
      start: format(start, "MM-dd HH:mm"),
      end: format(end, "MM-dd HH:mm"),
    };
  }
};

export const formatTime = (date: Date) => {
  return format(date, "yyyy-MM-dd HH:mm");
};
