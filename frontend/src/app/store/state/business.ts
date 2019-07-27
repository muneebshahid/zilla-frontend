import { IBType } from "../../models/btype";
import { IBFilters } from "./../../models/business_filters";
import { IBusiness } from "./../../models/business";
import { IAmenities } from "src/app/models/amenities";

export interface IBusinessState {
  businesses?: IBusiness[];
  business?: IBusiness;
  num_hits?: number;
  markers?: any;
  businessTypes: IBType[];
  businessAmenities: IAmenities[];
  filters?: IBFilters;
  paginationInfo?: Array<number>;
}

export const initialBusinessState: IBusinessState = {
  businesses: [],
  business: null,
  num_hits: 0,
  markers: null,
  businessTypes: null,
  businessAmenities: null,
  filters: {
    amenities: [],
    business_types: [],
    paginate: false
  },
  paginationInfo: [0, 10, 10]
};
