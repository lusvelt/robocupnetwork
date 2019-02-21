import { PlaceInterface } from './place.interface';
export interface SchoolInterface {
  id?: number;
  name: string;
  place: PlaceInterface[];
}
