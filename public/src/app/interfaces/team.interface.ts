import { AgeRangeInterface } from './age-range.interface';
import { UserInterface } from './user.interface';
import { SchoolInterface } from './school.interface';
export interface TeamInterface {
  id?: number;
  name: string;
  ageRanges: AgeRangeInterface[];
  schools: SchoolInterface[];
  users: UserInterface[];
}
