import {
  LoadingComponent,
  MHomeMenuDrawerComponent,
  MMenuComponent,
  HomeListingComponent,
  MenuComponent,
  MapComponent
} from "./../../testing/dummy_components";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeComponent } from "./home.component";
import { GoogleMapsAPIWrapper, AgmCoreModule } from "@agm/core";
import { GeoLocationService } from "src/app/services/geo-location/geo-location.service";
import { mapInitObj } from "src/app/app.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { appReducers } from "src/app/store/reducers/app.reducer";
import { StoreModule } from "@ngrx/store";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { cold, getTestScheduler } from "jasmine-marbles";
import { By } from "@angular/platform-browser";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        LoadingComponent,
        MHomeMenuDrawerComponent,
        MMenuComponent,
        MenuComponent,
        HomeListingComponent,
        MapComponent
      ],
      imports: [
        StoreModule.forRoot(appReducers),
        AgmCoreModule.forRoot(mapInitObj),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [GoogleMapsAPIWrapper, GeoLocationService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call subscribe in ngOnInit for getting businesses", () => {
    spyOn(component.isLoadingSelector, "subscribe").and.returnValue(of());
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.isLoadingSelector.subscribe).toHaveBeenCalled();
    expect(component.subscriptionsArr.length).toBeGreaterThan(0);
  });
  it("should unsubscribe to subscriptions", () => {
    const sub1 = of().subscribe();
    component.subscriptionsArr.push(sub1);
    const unsubscriber = spyOn(component.subscriptionsArr[0], "unsubscribe");

    component.ngOnDestroy();

    expect(unsubscriber).toHaveBeenCalled();
  });
  it("should set the loading sign  using subscription", () => {
    const observableParam = cold("a|", { a: true });
    component.isLoadingSelector = observableParam;
    component.ngOnInit();
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(component.loading).toBe(true);
  });
  it("should unsubscribe to subscriptions", () => {
    component.loading = false;
    fixture.detectChanges();
    let loadingDe = fixture.debugElement.query(By.css(".loading-tag"));
    expect(loadingDe).toBeNull();
  });
  it("should unsubscribe to subscriptions", () => {
    component.loading = true;
    fixture.detectChanges();
    let loadingDe = fixture.debugElement.query(By.css(".loading-tag"));
    expect(loadingDe).not.toBeNull();
  });
});
