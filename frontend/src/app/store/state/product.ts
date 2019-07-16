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
    query: "",
    product_type: null,
    tags: [],
    latlondis: [10, 10, 100000],
    available: -1,
    price: -1
  },
  product_tags: null,
  product_types: null
};
