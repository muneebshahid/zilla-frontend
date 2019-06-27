import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeComponent } from "./home.component";
import { Component, Input } from "@angular/core";
import { IProduct } from "src/app/models/product";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { IBusiness } from "src/app/models/business";
import { GoogleMapsAPIWrapper } from "@agm/core";
import { GeoLocationService } from "src/app/services/geo-location/geo-location.service";

@Component({ selector: "app-m-home-menu-drawer", template: "" })
class MHomeMenuDrawerComponent {}
@Component({ selector: "app-m-menu", template: "" })
class MMenuComponent {}
@Component({ selector: "app-menu", template: "" })
class MenuComponent {}
@Component({ selector: "app-loading", template: "" })
class LoadingComponent {}
@Component({ selector: "app-map", template: "" })
class MapComponent {
  @Input() mapClass;
}

@Component({ selector: "app-home-listings", template: "" })
class HomeListingsComponent {
  @Input() products: IProduct[];
}

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore<{ business: IBusiness[] }>;
  const initialState = { business: {} };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        MHomeMenuDrawerComponent,
        MMenuComponent,
        MenuComponent,
        LoadingComponent,
        HomeListingsComponent,
        MapComponent
      ],
      providers: [provideMockStore({ initialState }), GoogleMapsAPIWrapper, GeoLocationService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it("should create", () => {
  //   expect(component).toBeTruthy();
  // });
});
