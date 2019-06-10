import { IType } from "./type";
import { IProduct } from "./product";
import { ITimings } from "./timings";

export interface IBusiness {
  user: number;
  images: Array<string>;
  business_type: IType;
  opening_timings: Array<ITimings>;
  title: string;
  slug: string;
  description: string;
  website: string;
  address: string;
  claimed: boolean;
  phone_no: string;
}
