import { IProduct } from "./product";
import { ITimings } from "./timings";

export interface IBusiness {
  user: number;
  website: string;
  address: string;
  phone: string;
  products: Array<IProduct>;
  opening_times: Array<ITimings>;
  images: Array<string>;
  slug: string;
  latlng: Array<number>;
  title: string;
  tags: Array<string>;
  claimed: boolean;
  description: string;
  type: string;
}
