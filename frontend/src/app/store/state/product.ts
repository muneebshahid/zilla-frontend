import { IPFilters } from "./../../models/product_filters";
import { IProduct } from "../../models/product";
import { IPType } from "src/app/models/ptype";
import { ITags } from "src/app/models/tags";
import { IBusiness } from "src/app/models/business";

export interface IProductState {
  products?: IBusiness[];
  product?: IProduct;
  num_hits?: number;
  filters?: IPFilters;
  product_types?: IPType[];
  product_tags?: ITags[];
  markers?: any;
}

export const initialProductState: IProductState = {
  products: [],
  product: Object.assign({}),
  num_hits: 0,
  markers: null,
  filters: {
    product_types: [],
    tags: [],
    available: 0,
    price: 100
  }
};
