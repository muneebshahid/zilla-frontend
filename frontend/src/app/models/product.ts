import { IImage } from "./image";
import { ITags } from "./tags";

export interface IProduct {
  product: number;
  images: Array<IImage>;
  description: string;
  title: string;
  price: number;
  available: boolean;
  tags: Array<ITags>;
  owner: number;
  slug: string;
  latlng: Array<number>;
}
