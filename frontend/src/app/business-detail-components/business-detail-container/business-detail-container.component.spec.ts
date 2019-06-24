import { IProduct } from "src/app/models/product";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BusinessDetailContainerComponent } from "./business-detail-container.component";
import { Component, Input } from "@angular/core";
import { IAmenities } from "src/app/models/amenities";

@Component({ selector: "app-business-detail-menu", template: "" })
class BusinessDetailMenuComponent {
  @Input() products: IProduct[];
}

@Component({ selector: "app-business-detail-amenities", template: "" })
class BusinessDetailAmenitiesComponent {
  @Input() amenities: IAmenities;
}
@Component({ selector: "app-business-detail-opening-hours", template: "" })
class BusinessDetailOpeningHoursComponent {
  @Input() opening_timings: any[];
}
@Component({ selector: "app-business-detail-map", template: "" })
class BusinessDetailMapComponent {
  @Input() latlng = [10, 10];
  @Input() address: string;
  @Input() phone: string;
  @Input() website: string;
}

describe("BusinessDetailContainerComponent", () => {
  let component: BusinessDetailContainerComponent;
  let fixture: ComponentFixture<BusinessDetailContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BusinessDetailContainerComponent,
        BusinessDetailAmenitiesComponent,
        BusinessDetailMenuComponent,
        BusinessDetailOpeningHoursComponent,
        BusinessDetailMapComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
