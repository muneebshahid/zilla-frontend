import { IImage } from "./image";
import { ITags } from "./tags";

export interface IProduct {
  product: number;
  tags: Array<ITags>;
  images: Array<IImage>;
  latlng: Array<number>;
  title: string;
  slug: string;
  description: string;
  price: number;
  available: boolean;
  owner: number;
  expensive: number;
}
