export interface EventInterface {
    id?: number;
    name: string;
    description: string;
    pointsJSCalculator: string;
    affectsZone: string;
    affectsAttempt: number;
    manuallyTriggerable: boolean;
    needsStartCountForZones: boolean;
    triggerOnStart: boolean;
    waitLastIterationToTrigger: boolean;
    cancelPendingEvents: boolean;
  }
