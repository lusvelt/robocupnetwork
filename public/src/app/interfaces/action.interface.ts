import { ModuleInterface } from './module.interface';
import { ActionTypeInterface } from './action-type.interface';


export interface ActionInterface {
    id?: number;
    name: string;
    description: string;
    actionTypes: ActionTypeInterface[];
    modules: ModuleInterface[];
}
