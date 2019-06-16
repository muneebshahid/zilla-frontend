import { IImage } from "./image";
import { IType } from "./type";
import { ITimings } from "./timings";
import { IProduct } from "./product";

export interface IBusiness {
  user: number;
  images: Array<IImage>;
  business_type: IType;
  opening_timings: Array<ITimings>;
  is_open: boolean;
  title: string;
  slug: string;
  description: string;
  website: string;
  address: string;
  claimed: boolean;
  phone: string;
  expensive: number;
}
