import * as ImagePicker from "expo-image-picker";
import { MetaType } from "./commonType";

export interface TripDetailItemType {
  id: string;
  title: string;
  image: string;
  content: string;
  weather: string;
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

export interface RequestUpdateTripDetailType {
  tripDetailId: string;
  title: string;
  content: string;
  weather: string;
  image: ImagePicker.ImagePickerAsset;
}
