import { IBusinessMenu } from "./../models/business_menu";
import { IBusiness } from "../models/business";
import { IProduct } from "../models/product";
import { Marker } from "../models/marker";

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
      latlon: [1, 2, 3],
      products: [],
      images: [
        {
          file: ""
        }
      ],
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
  },
  {
    business: {
      id: 1,
      is_open: false,
      title: "",
      description: "",
      website: "",
      address: "",
      claimed: false,
      phone: "",
      latlon: [4, 5, 6],
      products: [],
      images: [
        {
          file: ""
        }
      ],
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

export const dummymarkers: Array<Marker> = [
  {
    lat: 1,
    lng: 2,
    label: "label1",
    icon: "icon1",
    highlighted: false,
    draggable: false,
    id: 0
  },
  {
    lat: 3,
    lng: 4,
    label: "label2",
    icon: "icon2",
    highlighted: true,
    draggable: true,
    id: 1
  },
  {
    lat: 5,
    lng: 6,
    label: "label3",
    icon: "icon3",
    highlighted: false,
    draggable: true,
    id: 2
  },
  {
    lat: 7,
    lng: 8,
    label: "label4",
    icon: "icon4",
    highlighted: true,
    draggable: false,
    id: 3
  }
];

export const productsObj: IProduct[] = [
  {
    product: 0,
    tags: [],
    images: [{ file: "" }],
    latlon: [],
    title: "dummy title",
    slug: "",
    description: "dummy description",
    price: 25,
    available: false,
    product_type: {
      tag: "dummy tag",
      id: 0,
      selected: false
    },
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

export const dummyAmenities = [
  { tag: "Amenity1", id: 1, checked: false },
  { tag: "Amenity2", id: 2, checked: false },
  { tag: "Amenity3", id: 3, checked: false }
];

export const dummyBusinessTypes = [
  { name: "Type1", id: 1, selected: false },
  { name: "Type2", id: 2, selected: false },
  { name: "Type3", id: 3, selected: false }
];

export const dummyFilterTags = [
  {
    id: 11,
    checked: true,
    tag: "halal"
  },
  {
    id: 12,
    checked: false,
    tag: "vegan"
  },
  {
    id: 13,
    checked: true,
    tag: "vegan2"
  }
];

export const dummyFilterTypes = [
  {
    id: 11,
    selected: true,
    tag: "halal"
  },
  {
    id: 12,
    selected: false,
    tag: "vegan"
  },
  {
    id: 13,
    selected: true,
    tag: "vegan2"
  }
];

export const dummyFilterTypesAllFalse = [
  {
    id: 11,
    selected: false,
    tag: "halal"
  },
  {
    id: 12,
    selected: false,
    tag: "halal2"
  }
];

export const dummyFilterTagsAllFalse = [
  {
    id: 11,
    checked: false,
    tag: "halal"
  },
  {
    id: 12,
    checked: false,
    tag: "halal2"
  }
];

export const businessMenuDummy: IBusinessMenu[] = [
  {
    menuItem: [
      {
        description: "menu_description1",
        title: "menu_title1",
        image: "menu_image1",
        price: 0
      },
      {
        description: "menu_description2",
        title: "menu_title2",
        image: "menu_image2",
        price: 1
      },
      {
        description: "menu_description3",
        title: "menu_title3",
        image: "menu_image3",
        price: 2
      }
    ],
    menuCategory: "drinks",
    collapsed: false,
    name: "drinkss"
  },
  {
    menuItem: [
      {
        description: "menu_description21",
        title: "menu_title21",
        image: "menu_image21",
        price: 5
      },
      {
        description: "menu_description22",
        title: "menu_title22",
        image: "menu_image22",
        price: 6
      },
      {
        description: "menu_description23",
        title: "menu_title23",
        image: "menu_image23",
        price: 7
      }
    ],
    menuCategory: "food",
    collapsed: true,
    name: "foodd"
  }
];

export const opening_timingsDummy = [
  {
    open: "21:52",
    close: "07:31"
  },
  {
    open: "09:28",
    close: "05:11"
  },
  {
    open: "00:34",
    close: "18:44"
  },
  {
    open: "08:17",
    close: "11:42"
  },
  {
    open: "05:02",
    close: "19:31"
  },
  {
    open: "05:39",
    close: "07:43"
  },
  {
    open: "00:10",
    close: "04:11"
  }
];
