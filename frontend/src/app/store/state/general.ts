import { IPFilters } from "./../../models/product_filters";
import { IBFilters } from "src/app/models/business_filters";
export interface IGeneralState {
  showingBusinesses?: boolean;
}

export const initialGeneralState: IGeneralState = {
  showingBusinesses: true
};
