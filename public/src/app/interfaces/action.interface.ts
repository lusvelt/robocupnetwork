import { ActionTypeInterface } from './action-type.interface';


export interface ActionInterface {
    id?: number;
    name: string;
    description: string;
    actionTypes: ActionTypeInterface[];
}
