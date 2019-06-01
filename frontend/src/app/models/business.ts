import { IUser } from "./user";
import { IProduct } from "./product";
import { ITimings } from "./timings";

export interface IBusiness {
  user: IUser;
  website: string;
  address: string;
  phone: string;
  products: Array<IProduct>;
  opening_times: Array<ITimings>;
  images: Array<string>;
  slug: string;
  lnglat: Array<number>;
  title: string;
  description: string;
}
