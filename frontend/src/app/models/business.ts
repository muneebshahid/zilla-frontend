import { IImage } from "./image";
import { IBType } from "./btype";
import { ITimings } from "./timings";
import { IAmenities } from "./amenities";
import { IProduct } from "./product";

export interface IBusiness {
  business: {
    id: number;
    is_open: boolean;
    title: string;
    description: string;
    website: string;
    address: string;
    claimed: boolean;
    phone: string;
    latlon: Array<number>;
    products: Array<IProduct>;

    images: Array<IImage>;
    business_type: IBType;
    opening_timings: Array<ITimings>;
    slug: string;
    expensive: number;
    amenities: Array<IAmenities>;
  };
}
