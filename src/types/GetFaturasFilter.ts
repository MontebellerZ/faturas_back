import { GroupCalendar } from "./GroupCalendar";

export type GetFaturasFilter = {
  startDate?: Date;
  endDate?: Date;
  dateGroup?: GroupCalendar;
  groupByTitle?: boolean;
  titleSearch?: string;
};
