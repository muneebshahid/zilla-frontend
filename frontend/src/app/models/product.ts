import { IImage } from "./image";
import { ITags } from "./tags";
import { IPType } from "./ptype";

export interface IProduct {
  product: number;
  tags: Array<ITags>;
  images: Array<IImage>;
  latlon: Array<number>;
  title: string;
  slug: string;
  description: string;
  price: number;
  available: boolean;
  product_type: IPType;
  owner: number;
  address: string;
  phone: string;
  expensive: number;
}
