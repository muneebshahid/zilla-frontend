import { IPFilters } from "./../../models/product_filters";
import { IProduct } from "../../models/product";

export interface IProductState {
  products?: IProduct[];
  product?: IProduct;
  num_hits?: number;
  filters?: IPFilters;
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
  }
};
