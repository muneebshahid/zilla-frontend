import { IBusiness } from "./business";

export interface IProduct {
  id: number;
  images: Array<string>;
  description: string;
  title: string;
  hidden: boolean;
  price: number;
  item_type: string;
  available: boolean;
  tags: Array<string>;
  owner: IBusiness;
  slug: string;
  latlng: Array<number>;
}
