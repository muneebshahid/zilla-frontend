import { IBusiness } from "./business";

export interface IProduct {
  item: number;
  images: Array<string>;
  description: string;
  title: string;
  price: number;
  type: string;
  available: boolean;
  tags: Array<string>;
  owner: IBusiness;
  slug: string;
  latlng: Array<number>;
}
