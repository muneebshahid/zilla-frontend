import { IBusiness } from "../models/business";
import { IProduct } from "../models/product";

export const businessObj: IBusiness[] = [
  {
    business: {
      id: 0,
      is_open: false,
      title: "",
      description: "",
      website: "",
      address: "",
      claimed: false,
      phone: "",
      latlon: [],
      products: [],
      images: [],
      business_type: {
        tag: "",
        id: 0,
        icon: "",
        selected: false
      },
      opening_timings: [],
      slug: "",
      expensive: 0,
      amenities: []
    }
  }
];

export const productsObj: IProduct[] = [
  {
    product: 0,
    tags: [],
    images: [],
    latlon: [],
    title: "",
    slug: "",
    description: "",
    price: 0,
    available: false,
    product_type: Object.assign({}),
    owner: 0,
    expensive: 0,
    address: "",
    phone: ""
  }
];

export const storeInitialState = {
  products: {},
  businesses: {},
  general: {}
};
