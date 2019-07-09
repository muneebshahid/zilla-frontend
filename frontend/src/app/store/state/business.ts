import { IBusiness } from "./../../models/business";

export interface IBusinessState {
  businesses?: IBusiness[];
  business?: IBusiness;
  num_hits?: number;
  markers?: any;
}

export const initialBusinessState: IBusinessState = {
  businesses: [],
  business: null,
  num_hits: 0,
  markers: null
};
