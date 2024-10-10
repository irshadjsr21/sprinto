import { format } from "date-fns";

export const formatDate = (date?: string | null) => {
  if (!date) {
    return "";
  }
  return format(new Date(parseInt(date)), "dd MMM yyyy");
};
