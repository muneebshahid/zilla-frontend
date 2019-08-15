import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BusinessDetailMapComponent } from "./business-detail-map.component";
import { MapComponent } from "src/app/testing/dummy_components";
import { dummyMapComponentSpy } from "src/app/testing/dummy_spies";

describe("BusinessDetailMapComponent", () => {
  let component: BusinessDetailMapComponent;
  let fixture: ComponentFixture<BusinessDetailMapComponent>;
  let mapComponentSpy;
  beforeEach(async(() => {
    mapComponentSpy = dummyMapComponentSpy;

    TestBed.configureTestingModule({
      declarations: [BusinessDetailMapComponent, MapComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDetailMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call setFocusLocation for mapComponent", () => {
    component.latlon = [1, 2];
    component.mapComponent = mapComponentSpy;
    component.ngOnChanges({});
    expect(mapComponentSpy.setFocusLocation).toHaveBeenCalled();
  });
  it("should not call setFocusLocation for mapComponent", () => {
    component.latlon = null;
    component.mapComponent = mapComponentSpy;
    component.ngOnChanges({});
    expect(mapComponentSpy.setFocusLocation).not.toHaveBeenCalled();
  });
});
