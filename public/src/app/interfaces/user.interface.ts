import { RoleInterface } from './role.interface';

export interface UserInterface {
    name: string;
    surname: string;
    email: string;
    birthDate: Date;
    password?: string;
    isAdmin: boolean;
    roles: RoleInterface [];
}
