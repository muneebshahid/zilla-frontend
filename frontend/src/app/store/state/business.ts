import { IBusiness } from "./../../models/business";

export interface IBusinessState {
  businesses: IBusiness[];
}

export const initialBusinessState: IBusinessState = {
  businesses: null
};
