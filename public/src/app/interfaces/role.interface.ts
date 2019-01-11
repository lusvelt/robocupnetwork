import { ActionInterface } from './action.interface';

export interface RoleInterface {
    id?: number;
    name: string;
    description: string;
    actions: ActionInterface[];
}
