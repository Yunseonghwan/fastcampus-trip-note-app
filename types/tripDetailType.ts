import { MetaType } from "./commonType";

export interface TripDetailItemType {
  id: string;
  title: string;
  image: string;
  createdAt: string | Date;
}

export interface ResponseTripDetailList {
  data: TripDetailItemType[];
  meta: MetaType;
}
