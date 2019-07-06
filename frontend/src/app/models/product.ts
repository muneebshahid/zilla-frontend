import { IImage } from "./image";
import { ITags } from "./tags";
import { IType } from "./type";

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
  product_type: IType;
  owner: number;
  expensive: number;
}
