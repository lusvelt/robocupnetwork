import { RoleInterface } from './role.interface';
import { PlaceInterface } from './place.interface';

export interface ManifestationInterface {
  id?: number;
  name: string;
  description: string;
  start: Date;
  end: Date;
  roles?: RoleInterface[];
  place: PlaceInterface;
}
