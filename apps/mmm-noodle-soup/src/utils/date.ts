import { format } from "date-fns";

export const formatDate = (date: string | Date) => {
  return format(new Date(date), "MMMM d, yyyy 'at' h:mm a");
};

export const formatDateShort = (date: string | Date) => {
  return format(new Date(date), "MMMM d, yyyy");
};
