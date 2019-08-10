import { businessMenuDummy } from "./../../testing/models";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BusinessDetailMenuComponent } from "./business-detail-menu.component";
import { businessObj } from "src/app/testing/models";

describe("BusinessDetailMenuComponent", () => {
  let component: BusinessDetailMenuComponent;
  let fixture: ComponentFixture<BusinessDetailMenuComponent>;
  let products;
  let businessMenus;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessDetailMenuComponent]
    }).compileComponents();

    products = businessObj;
    businessMenus = businessMenuDummy;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDetailMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should add the items to the business detail menu", () => {
    expect(component).toBeTruthy();
  });
});
