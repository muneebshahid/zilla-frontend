import { IProduct } from "../../models/product";

export interface IProductState {
  products?: IProduct[];
  product?: IProduct;
  num_hits?: number;
}

export const initialProductState: IProductState = {
  products: [],
  product: Object.assign({}),
  num_hits: 0
};
