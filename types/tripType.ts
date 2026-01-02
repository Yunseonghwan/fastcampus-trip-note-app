import { MetaType } from "./commonType";

export interface RequestCreateType {
  title: string;
  startDate?: Date;
  endDate?: Date;
}

export interface TripListItemType {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
}

export interface ResponseTripListType {
  data: TripListItemType[];
  meta: MetaType;
}
