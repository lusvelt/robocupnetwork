import { CategoryInterface } from './category.interface';
import { TeamInterface } from './team.interface';

export interface PhaseInterface {
  id?: number;
  name: string;
  description: string;
  start: Date;
  end: Date;
  numAdmittedTeams: number;
  numPassingTeams: number;
  category: CategoryInterface;
  teams: TeamInterface[];
}
