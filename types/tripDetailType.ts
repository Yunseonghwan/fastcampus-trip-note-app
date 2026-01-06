import * as ImagePicker from "expo-image-picker";
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

export interface RequestCreateTripDetailType {
  tripId: string;
  title: string;
  content: string;
  weather: string;
  image: ImagePicker.ImagePickerAsset;
}
