import { IProduct } from "../../models/product";

export interface IProductState {
  products: IProduct[];
  product: IProduct;
}

export const initialProductState: IProductState = {
  products: [],
  product: Object.assign({})
};
