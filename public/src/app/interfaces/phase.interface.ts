import { CategoryInterface } from './category.interface';

export interface PhaseInterface {
  id?: number;
  name: string;
  description: string;
  start: Date;
  end: Date;
  numAdmittedTeams: number;
  numPassingTeams: number;
  category: CategoryInterface;
}
