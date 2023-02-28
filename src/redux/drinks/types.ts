import { PizzaStatus } from "../pizza/types";
import { IItem } from "../../components/saladsList/SaladsList";

export interface IItemsSliceState {
    items: IItem[],
    status: PizzaStatus
}