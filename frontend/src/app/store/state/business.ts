import { IBusiness } from "./../../models/business";

export interface IBusinessState {
  businesses?: IBusiness[];
  business?: IBusiness;
  num_hits?: number;
}

export const initialBusinessState: IBusinessState = {
  businesses: [],
  business: null,
  num_hits: 0
};
