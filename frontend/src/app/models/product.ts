import { IBusiness } from "./business";

export interface IProduct {
  id: number;
  owner: IBusiness;
  images: Array<string>;
  description: string;
  price: number;
  available: boolean;
  hidden: boolean;
  tags: Array<string>;
}
