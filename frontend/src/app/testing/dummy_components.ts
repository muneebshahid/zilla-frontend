import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IProduct } from "../models/product";
import { IAmenities } from "../models/amenities";
import { IBusiness } from "../models/business";

@Component({ selector: "app-m-home-menu-drawer", template: "" })
export class MHomeMenuDrawerComponent {}

@Component({ selector: "app-m-menu", template: "" })
export class MMenuComponent {}

@Component({ selector: "app-menu", template: "" })
export class MenuComponent {}

@Component({ selector: "app-detail-header-gallery", template: "" })
export class DetailHeaderGalleryComponent {
  @Input() images: Array<string>;
}
@Component({ selector: "app-detail-header", template: "" })
export class DetailHeaderComponent {
  @Input() type: any = "";
  @Input() description: string = "";
  @Input() title: string = "";
  @Input() address: string = "";
  @Input() phone: string = "";
  @Input() expensive: number = 0;
  @Input() tags: Array<string> = [];
  @Input() open_or_available: string = "Closed";
  @Input() is_open_or_available: boolean = true;
}

@Component({ selector: "app-business-detail-menu", template: "" })
export class BusinessDetailMenuComponent {
  @Input() products: IProduct[];
}

@Component({ selector: "app-business-detail-amenities", template: "" })
export class BusinessDetailAmenitiesComponent {
  @Input() amenities: IAmenities;
}
@Component({ selector: "app-business-detail-opening-hours", template: "" })
export class BusinessDetailOpeningHoursComponent {
  @Input() opening_timings: any[];
}

@Component({ selector: "app-business-detail-container", template: "" })
export class BusinessDetailContainerComponent {
  @Input() business: IBusiness;
}

@Component({ selector: "app-business-detail-map", template: "" })
export class BusinessDetailMapComponent {
  @Input() latlng = [10, 10];
  @Input() address: string;
  @Input() phone: string;
  @Input() website: string;
}
@Component({ selector: "app-m-filter-map-menu", template: "" })
export class MFilterMapMenuComponent {
  @Output() setMobileMapView = new EventEmitter<string>();
  @Input() searchBarEnabled = true;
}

@Component({ selector: "app-map", template: "" })
export class MapComponent {
  @Input() mapClass;
  public markers: Array<any> = [];
}

@Component({ selector: "app-general-info", template: "" })
export class GeneralInfoComponent {}

@Component({ selector: "app-opening-closing-hours", template: "" })
export class OpeningClosingHoursComponent {}

@Component({ selector: "app-location", template: "" })
export class LocationComponent {}

@Component({ selector: "app-add-menu", template: "" })
export class AddMenuComponent {}

@Component({ selector: "app-add-media", template: "" })
export class AddMediaComponent {}

@Component({ selector: "app-add-social-links", template: "" })
export class AddSocialLinksComponent {}

@Component({ selector: "app-listing-tags", template: "" })
export class ListingTagsComponent {}
@Component({ selector: "app-home", template: "" })
export class HomeComponent {}
@Component({ selector: "app-loading", template: "" })
export class LoadingComponent {}

@Component({ selector: "app-home-listings", template: "" })
export class HomeListingComponent {
  @Input() public mapComponent: MapComponent = new MapComponent();
}
@Component({ selector: "app-home-drawers-container", template: "" })
export class HomeDrawersContainerComponent {}
@Component({ selector: "app-home-filter-drawer", template: "" })
export class HomeFilterDrawerComponent {}
@Component({ selector: "app-filter-drawer", template: "" })
export class AddListingComponent {}
@Component({ selector: "app-product-info", template: "" })
export class ProductInfoComponent {
  @Input() public homePage = false;
}
@Component({ selector: "app-business-info", template: "" })
export class BusinessInfoComponent {
  @Input() public homePage = false;
}
