import { IImage } from "./image";
import { IType } from "./type";
import { ITimings } from "./timings";
import { IProduct } from "./product";

export interface IBusiness {
  user: number;
  website: string;
  address: string;
  phone: string;
  opening_timings: Array<ITimings>;
  images: Array<IImage>;
  slug: string;
  title: string;
  claimed: boolean;
  description: string;
  business_type: IType;
  open: boolean;
  products: Array<IProduct>;
}
