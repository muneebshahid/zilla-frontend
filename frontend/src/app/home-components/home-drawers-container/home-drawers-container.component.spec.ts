import { HomeFilterDrawerComponent } from "./../../testing/dummy_components";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeDrawersContainerComponent } from "./home-drawers-container.component";
import { appReducers } from "src/app/store/reducers/app.reducer";
import { StoreModule, Store } from "@ngrx/store";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";
import { businessObj } from "src/app/testing/models";
import { cold, getTestScheduler } from "jasmine-marbles";
import { BusinessService } from "src/app/services/business/business.service";
import { LocationService } from "src/app/services/location/location.service";
import { ComponentFactoryResolver, destroyPlatform } from "@angular/core";
import { IAppState } from "src/app/store/state/app.state";

let componentRefStub = {
  instance: {
    business: {},
    isActive: false
  },
  destroy() {}
};

describe("HomeDrawersContainerComponent", () => {
  let component: HomeDrawersContainerComponent;
  let fixture: ComponentFixture<HomeDrawersContainerComponent>;
  let businessServiceSpy;
  let locationServiceSpy;
  let resolverServiceSpy;
  let store: Store<IAppState>;

  beforeEach(async(() => {
    businessServiceSpy = jasmine.createSpyObj("BusinessService", [
      "getPendingDetailID",
      "setPendingDetailID",
      "checkBusinessShownByID"
    ]);
    locationServiceSpy = jasmine.createSpyObj("LocationService", ["clearLocation"]);
    resolverServiceSpy = jasmine.createSpyObj("ComponentFactoryResolver", [
      "resolveComponentFactory"
    ]);

    TestBed.configureTestingModule({
      declarations: [HomeDrawersContainerComponent, HomeFilterDrawerComponent],
      imports: [StoreModule.forRoot(appReducers), RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: BusinessService, useValue: businessServiceSpy },
        { provide: LocationService, useValue: locationServiceSpy },
        { provide: ComponentFactoryResolver, useValue: resolverServiceSpy }
      ]
    }).compileComponents();
    store = TestBed.get(Store);
    spyOn(store, "dispatch").and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDrawersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call subscribtions in ngOnInit", () => {
    spyOn(component.businessSelector, "subscribe").and.returnValue(of());
    spyOn(component.closeDrawerSelector, "subscribe").and.returnValue(of());
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.businessSelector.subscribe).toHaveBeenCalled();
    expect(component.closeDrawerSelector.subscribe).toHaveBeenCalled();
    expect(component.subscriptionsArr.length).toBeGreaterThan(1);
  });

  it("should call internal business subscription without putTemporaryMarkerOnMap", () => {
    let businessParam = cold("a|", { a: businessObj[0] });
    component.businessSelector = businessParam;
    businessServiceSpy.getPendingDetailID.and.returnValue(1);
    businessServiceSpy.checkBusinessShownByID.and.returnValue(true);
    let latlondisSpy = spyOn(component.setLatLonDis, "emit");
    let componentSpy = spyOn(component, "createComponent");
    let putTmpMarkSpy = spyOn(component.putTemporaryMarkerOnMap, "emit");
    expect(component.business).toBeUndefined();
    component.ngOnInit();
    getTestScheduler().flush();
    fixture.detectChanges();

    expect(componentSpy).toHaveBeenCalled();
    expect(latlondisSpy).toHaveBeenCalled();
    expect(businessServiceSpy.getPendingDetailID).toHaveBeenCalledTimes(2);
    expect(businessServiceSpy.checkBusinessShownByID).toHaveBeenCalled();
    expect(component.business).not.toBeUndefined();
    expect(putTmpMarkSpy).not.toHaveBeenCalled();
  });
  it("should call internal business subscription with pending detail id null", () => {
    let businessParam = cold("a|", { a: businessObj[0] });
    component.businessSelector = businessParam;
    businessServiceSpy.getPendingDetailID.and.returnValue(null);
    businessServiceSpy.checkBusinessShownByID.and.returnValue(true);
    let latlondisSpy = spyOn(component.setLatLonDis, "emit");
    let componentSpy = spyOn(component, "createComponent");
    let putTmpMarkSpy = spyOn(component.putTemporaryMarkerOnMap, "emit");
    expect(component.business).toBeUndefined();
    component.ngOnInit();
    getTestScheduler().flush();
    fixture.detectChanges();

    expect(componentSpy).toHaveBeenCalled();
    expect(latlondisSpy).toHaveBeenCalled();

    expect(businessServiceSpy.getPendingDetailID).toHaveBeenCalledTimes(1);
    expect(businessServiceSpy.checkBusinessShownByID).not.toHaveBeenCalled();
    expect(component.business).not.toBeUndefined();
    expect(putTmpMarkSpy).not.toHaveBeenCalled();
  });

  it("should call internal business subscription with putTemporaryMarkerOnMap", () => {
    let businessParam = cold("a|", { a: businessObj[0] });
    component.businessSelector = businessParam;
    businessServiceSpy.getPendingDetailID.and.returnValue(1);
    businessServiceSpy.checkBusinessShownByID.and.returnValue(false);
    let latlondisSpy = spyOn(component.setLatLonDis, "emit");
    let putTmpMarkSpy = spyOn(component.putTemporaryMarkerOnMap, "emit");
    let componentSpy = spyOn(component, "createComponent");
    expect(component.business).toBeUndefined();

    component.ngOnInit();
    getTestScheduler().flush();
    fixture.detectChanges();

    expect(componentSpy).toHaveBeenCalled();
    expect(latlondisSpy).toHaveBeenCalled();
    expect(businessServiceSpy.getPendingDetailID).toHaveBeenCalledTimes(2);
    expect(businessServiceSpy.checkBusinessShownByID).toHaveBeenCalled();
    expect(component.business).not.toBeUndefined();
    expect(putTmpMarkSpy).toHaveBeenCalled();
  });

  it("should call close Drawer Selector with true", () => {
    let businessParam = cold("a|", { a: true });
    component.closeDrawerSelector = businessParam;

    let removeTmpMarkSpy = spyOn(component.removeTemporaryMarkerOnMap, "emit");
    let destroyComponentSpy = spyOn(component, "destroyComponent");
    businessServiceSpy.getPendingDetailID.and.returnValue(1);

    component.ngOnInit();
    getTestScheduler().flush();
    fixture.detectChanges();

    expect(businessServiceSpy.getPendingDetailID).toHaveBeenCalled();
    expect(businessServiceSpy.setPendingDetailID).toHaveBeenCalled();
    expect(removeTmpMarkSpy).toHaveBeenCalled();
    expect(locationServiceSpy.clearLocation).toHaveBeenCalled();
    expect(destroyComponentSpy).toHaveBeenCalled();
  });
  it("should unsubscribe to subscriptions", () => {
    const sub1 = of().subscribe();
    component.subscriptionsArr.push(sub1);
    const unsubscriber = spyOn(component.subscriptionsArr[0], "unsubscribe");

    component.ngOnDestroy();

    expect(unsubscriber).toHaveBeenCalled();
  });
  it("should create a new instance of a component", () => {
    let entryClearComponentSpy = spyOn(component.entry, "clear");
    let entrycreateComponentSpy = spyOn(component.entry, "createComponent");
    entrycreateComponentSpy.and.returnValue(componentRefStub);
    component.createComponent(businessObj[0]);
    expect(entryClearComponentSpy).toHaveBeenCalled();
    expect(resolverServiceSpy.resolveComponentFactory).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalled();
    expect(entrycreateComponentSpy).toHaveBeenCalled();
  });
  it("should call destroyComponent", () => {
    component.componentRef = componentRefStub;
    let componentRefSpy = spyOn(component.componentRef, "destroy");
    component.destroyComponent();

    expect(componentRefSpy).toHaveBeenCalled();
  });
});
