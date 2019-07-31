import { IProduct } from "src/app/models/product";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BusinessDetailContainerComponent } from "./business-detail-container.component";
import {
  BusinessDetailAmenitiesComponent,
  BusinessDetailMenuComponent,
  BusinessDetailOpeningHoursComponent,
  BusinessDetailMapComponent
} from "src/app/testing/dummy_components";

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
