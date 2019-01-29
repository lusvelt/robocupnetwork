export interface CategoryInterface {
  id?: number;
  name: string;
  description: string;
  scoringType: string;
  runType: string;
  maxRobotsPerTeam: number;
  maxTeamsPerLineup: number;
  isDividedIntoZones: boolean;
  checkpointsDetermineZones: boolean;
  requiresEvacuation: boolean;
  defaultMaxTime: number;
}
