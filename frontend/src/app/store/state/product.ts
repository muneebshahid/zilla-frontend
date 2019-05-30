import { IProduct } from "../../models/product";

export const initialProductState: IProduct = {
  id: 0,
  owner: null,
  images: [],
  description: null,
  price: 0,
  available: false,
  hidden: false,
  tags: []
};
