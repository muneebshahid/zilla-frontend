import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, Input } from "@angular/core";

import { ExploreComponent } from "./explore.component";
import { Store, MemoizedSelector } from "@ngrx/store";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { IProduct } from "src/app/models/product";
import { IBusiness } from "src/app/models/business";

@Component({ selector: "app-m-home-menu-drawer", template: "" })
class MHomeMenuDrawerComponent {}

@Component({ selector: "app-m-filter-map-menu", template: "" })
class MFilterMapMenuComponent {
  @Input() searchBarEnabled: boolean = false;
}

@Component({ selector: "app-menu", template: "" })
class MenuComponent {}

@Component({ selector: "app-m-menu", template: "" })
class MMenuComponent {}

@Component({ selector: "app-explore-businesses", template: "" })
class ExploreBusinessesComponent {}

@Component({ selector: "app-explore-products", template: "" })
class ExploreProductsComponent {}

describe("ExploreComponent", () => {
  let component: ExploreComponent;
  let fixture: ComponentFixture<ExploreComponent>;
  // let store: MockStore<{ products: IProduct; businesses: IBusiness[] }>;
  // const initialState = { products: null, businesses: [] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExploreComponent,
        MHomeMenuDrawerComponent,
        MFilterMapMenuComponent,
        MMenuComponent,
        MenuComponent,
        ExploreBusinessesComponent,
        ExploreProductsComponent
      ]
      // providers: [provideMockStore({ initialState })]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it("should create", () => {
  //   expect(component).toBeTruthy();
  // });
});
