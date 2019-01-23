import { RoleInterface } from './role.interface';

export interface ManifestationInterface {
  id?: number;
  name: string;
  description: string;
  start: Date;
  end: Date;
  roles?: RoleInterface[];
}
