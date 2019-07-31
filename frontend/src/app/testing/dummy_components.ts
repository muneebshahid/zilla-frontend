import { Component, Input } from "@angular/core";
import { IProduct } from "../models/product";
import { IAmenities } from "../models/amenities";

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
@Component({ selector: "app-business-detail-map", template: "" })
export class BusinessDetailMapComponent {
  @Input() latlng = [10, 10];
  @Input() address: string;
  @Input() phone: string;
  @Input() website: string;
}

@Component({ selector: "app-map", template: "" })
export class MapComponent {
  @Input() mapClass;
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
  @Input() public mapComponent: MapComponent;
}
@Component({ selector: "app-add-listing", template: "" })
export class AddListingComponent {}
