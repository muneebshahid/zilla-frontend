import { IProduct } from "../../models/product";

export interface IProductState {
  products: IProduct[];
}

export const initialProductState: IProductState = {
  products: null
};
