import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MapComponent } from "./map.component";
import { AgmCoreModule, GoogleMapsAPIWrapper } from "@agm/core";
import { AgmSnazzyInfoWindowModule } from "@agm/snazzy-info-window";
import { GeoLocationService } from "src/app/services/geo-location/geo-location.service";
import { appReducers } from "src/app/store/reducers/app.reducer";
import { StoreModule, Store } from "@ngrx/store";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { IAppState } from "src/app/store/state/app.state";
import { of } from "rxjs";
import { cold, getTestScheduler } from "jasmine-marbles";
import { BusinessService } from "src/app/services/business/business.service";
import { Marker } from "@agm/core/services/google-maps-types";
import { dummymarkers } from "src/app/testing/models";

describe("MapComponent", () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let store: Store<IAppState>;
  let businessServiceSpy;

  beforeEach(async(() => {
    businessServiceSpy = jasmine.createSpyObj("BusinessService", ["dispatchGetBusinessDetail"]);

    TestBed.configureTestingModule({
      declarations: [MapComponent],
      imports: [
        StoreModule.forRoot(appReducers),
        HttpClientTestingModule,
        AgmCoreModule.forRoot({
          apiKey: ""
        }),
        AgmSnazzyInfoWindowModule,
        RouterTestingModule
      ],
      providers: [
        GoogleMapsAPIWrapper,
        GeoLocationService,
        { provide: BusinessService, useValue: businessServiceSpy }
      ]
    }).compileComponents();

    store = TestBed.get(Store);
    spyOn(store, "dispatch").and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dummymarkers[0].icon = "icon1";
    dummymarkers[1].icon = "icon2";
    dummymarkers[2].icon = "icon3";
    dummymarkers[3].icon = "icon4";
    component.markers = dummymarkers;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set initialMapLatLonDis, call subscribe for markerHighlightingSelector, \
      call subscribe for generalFilterSelector, push 2 items in subscription array", () => {
    spyOn(component.markerHighlightingSelector, "subscribe").and.returnValue(of(null));
    spyOn(component.generalFilterSelector, "subscribe").and.returnValue(of(null));

    component.ngOnInit();
    expect(component.markerHighlightingSelector.subscribe).toHaveBeenCalled();
    expect(component.generalFilterSelector.subscribe).toHaveBeenCalled();
    expect(component.subscriptionsArr.length).toBe(4);
    expect(component.location.lat).toBe(component.initialMapLocationLat);
    expect(component.location.lng).toBe(component.initialMapLocationLng);
    expect(component.location.zoom).toBe(component.initialZoom);
  });

  it("should assign new latlondis value to map using generalFilterSelector ", () => {
    const newlatlondis = { latlondis: [3, 2, 1] };
    const observableParam = cold("a|", { a: newlatlondis });
    component.generalFilterSelector = observableParam;
    component.ngOnInit();
    fixture.detectChanges();
    getTestScheduler().flush();
    expect(component.location.lat).toBe(3);
    expect(component.location.lng).toBe(2);
    expect(component.location.zoom).toBe(12);
    expect(component.lastLatLonDis[0]).toBe(newlatlondis.latlondis[0]);
    expect(component.lastLatLonDis[1]).toBe(newlatlondis.latlondis[1]);
    expect(component.lastLatLonDis[2]).toBe(newlatlondis.latlondis[2]);
  });

  it("should get business detail and set map focus using openDetailDrawers ", () => {
    const marker = {
      lat: 33,
      lng: 22
    };
    component.detailViewZoom = 99;
    component.openDetailDrawer(marker);

    expect(businessServiceSpy.dispatchGetBusinessDetail).toHaveBeenCalled();
    expect(component.location.lat).toBe(33);
    expect(component.location.lng).toBe(22);
    expect(component.location.zoom).toBe(99);
  });

  it("should highlight marker by id", () => {
    expect(component.markers[2].icon).toBe("icon3");

    component.highlightMarkerByID({
      markerID: 2,
      highlighted: true
    });
    expect(component.markers[2].icon).toBe(component.highlightedMarkerIcon);
  });

  it("should undo highlight of marker by id", () => {
    expect(component.markers[3].icon).toBe("icon4");

    component.highlightMarkerByID({
      markerID: 3,
      highlighted: false
    });
    expect(component.markers[3].icon).toBe(component.normalMarkerIcon);
  });
});
