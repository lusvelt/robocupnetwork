import { RoleInterface } from './role.interface';
import { ManifestationInterface } from './manifestation.interface';

export interface UserInterface {
    name: string;
    surname: string;
    email: string;
    birthDate: Date;
    password?: string;
    isAdmin: boolean;
    manifestations: ManifestationInterface [];
    standardRoles: RoleInterface [];
}
