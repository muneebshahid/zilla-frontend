import { IPFilters } from "./../../models/product_filters";
import { IProduct } from "../../models/product";
import { IPType } from "src/app/models/ptype";
import { ITags } from "src/app/models/tags";

export interface IProductState {
  products?: IProduct[];
  product?: IProduct;
  num_hits?: number;
  filters?: IPFilters;
  product_types?: IPType;
  product_tags?: ITags;
}

export const initialProductState: IProductState = {
  products: [],
  product: Object.assign({}),
  num_hits: 0,
  filters: {
    query: "",
    product_type: "",
    tags: [],
    latlondis: [10, 10, 100000],
    available: 0,
    price: 0
  },
  product_tags: null,
  product_types: null
};
