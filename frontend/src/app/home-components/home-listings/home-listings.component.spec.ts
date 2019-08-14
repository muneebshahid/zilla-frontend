import { ProductInfoComponent } from "./../../general-components/product-info/product-info.component";
import {
  HomeDrawersContainerComponent,
  BusinessInfoComponent,
  MapComponent,
  HomeFilterDrawerComponent,
  MFilterMapMenuComponent
} from "./../../testing/dummy_components";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeListingsComponent } from "./home-listings.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { StoreModule } from "@ngrx/store";
import { appReducers } from "src/app/store/reducers/app.reducer";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

describe("HomeListingsComponent", () => {
  let component: HomeListingsComponent;
  let fixture: ComponentFixture<HomeListingsComponent>;
  let mapComponent;
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
    mapComponent = new MapComponent();
    component.mapComponent = mapComponent;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
