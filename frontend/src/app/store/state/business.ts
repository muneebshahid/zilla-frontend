import { IBusiness } from "./../../models/business";

export interface IBusinessState {
  businesses: IBusiness[];
  business: IBusiness;
}

export const initialBusinessState: IBusinessState = {
  businesses: null,
  business: null
};
