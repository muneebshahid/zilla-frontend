import { IBFilters } from "./../../models/business_filters";
import { IBusiness } from "./../../models/business";

export interface IBusinessState {
  businesses?: IBusiness[];
  business?: IBusiness;
  num_hits?: number;
  markers?: any;
  filters?: IBFilters;
}

export const initialBusinessState: IBusinessState = {
  businesses: [],
  business: null,
  num_hits: 0,
  markers: null,
  filters: {
    latlondis: [10, 10, 100000],
    query: "",
    amenities: [],
    business_type: ""
  }
};
