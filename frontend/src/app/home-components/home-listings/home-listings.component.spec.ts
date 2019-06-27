import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeListingsComponent } from "./home-listings.component";
import { Component, Input } from "@angular/core";
import { IProduct } from "src/app/models/product";

@Component({ selector: "app-home-filter-drawer", template: "" })
class HomeFilterDrawerComponent {}

@Component({ selector: "app-m-filter-map-menu", template: "" })
class MFilterMapMenuComponent {
  @Input() searchBarEnabled: boolean = false;
}

@Component({ selector: "app-home-product-info", template: "" })
class HomeProductInfoComponent {
  @Input() product: IProduct;
}

describe("HomeListingsComponent", () => {
  let component: HomeListingsComponent;
  let fixture: ComponentFixture<HomeListingsComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeListingsComponent,
        HomeFilterDrawerComponent,
        MFilterMapMenuComponent,
        HomeProductInfoComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
