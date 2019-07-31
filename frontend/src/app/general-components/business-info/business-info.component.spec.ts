import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BusinessInfoComponent } from "./business-info.component";
import { StoreModule } from "@ngrx/store";
import { appReducers } from "src/app/store/reducers/app.reducer";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from "src/app/app-routing.module";
import {
  LoadingComponent,
  MHomeMenuDrawerComponent,
  MMenuComponent,
  MenuComponent,
  MapComponent,
  HomeListingComponent,
  GeneralInfoComponent,
  OpeningClosingHoursComponent,
  LocationComponent,
  HomeComponent,
  AddListingComponent
} from "src/app/testing/dummy_components";
describe("BusinessInfoComponent", () => {
  let component: BusinessInfoComponent;
  let fixture: ComponentFixture<BusinessInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BusinessInfoComponent,
        HomeComponent,
        AddListingComponent,
        MHomeMenuDrawerComponent,
        MMenuComponent,
        MenuComponent,
        MapComponent,
        HomeListingComponent,
        LoadingComponent,
        GeneralInfoComponent,
        OpeningClosingHoursComponent,
        LocationComponent
      ],
      imports: [
        StoreModule.forRoot(appReducers),
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
