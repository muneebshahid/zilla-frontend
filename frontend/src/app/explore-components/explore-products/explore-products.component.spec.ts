import { IBusiness } from "./../../models/business";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ExploreProductsComponent } from "./explore-products.component";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { IProduct } from "src/app/models/product";

describe("ExploreProductsComponent", () => {
  let component: ExploreProductsComponent;
  let fixture: ComponentFixture<ExploreProductsComponent>;
  let store: MockStore<{ products: IProduct; businesses: IBusiness[] }>;
  const initialState = { products: null, businesses: [] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExploreProductsComponent],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it("should create", () => {
  //   expect(component).toBeTruthy();
  // });
});
