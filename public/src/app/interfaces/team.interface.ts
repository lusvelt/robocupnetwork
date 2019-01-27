import { AgeRangeInterface } from './age-range.interface';
export interface TeamInterface {
  id?: number;
  name: string;
  ageRanges: AgeRangeInterface[];
}
