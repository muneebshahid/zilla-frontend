import { ProductInfoComponent } from "./../../general-components/product-info/product-info.component";
import {
  HomeDrawersContainerComponent,
  BusinessInfoComponent
} from "./../../testing/dummy_components";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeListingsComponent } from "./home-listings.component";
import { Component, Input } from "@angular/core";
import { IProduct } from "src/app/models/product";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { StoreModule } from "@ngrx/store";
import { appReducers } from "src/app/store/reducers/app.reducer";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

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
        ProductInfoComponent,
        BusinessInfoComponent,
        HomeDrawersContainerComponent
      ],
      imports: [
        InfiniteScrollModule,
        StoreModule.forRoot(appReducers),
        HttpClientTestingModule,
        RouterTestingModule
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
