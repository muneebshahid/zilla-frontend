import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProductInfoComponent } from "./product-info.component";
import { appReducers } from "src/app/store/reducers/app.reducer";
import { StoreModule, Store } from "@ngrx/store";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { cold, getTestScheduler } from "jasmine-marbles";
import { businessObj } from "src/app/testing/models";
import { IAppState } from "src/app/store/state/app.state";
import { BusinessService } from "src/app/services/business/business.service";
import { GeneralService } from "src/app/services/general/general.service";
import { FiltersService } from "src/app/services/filters/filters.service";
import { ProductService } from "src/app/services/product/product.service";
import { HighlightMapMarker } from "src/app/store/actions/general";
import { By } from "@angular/platform-browser";

describe("ProductInfoComponent", () => {
  let component: ProductInfoComponent;
  let fixture: ComponentFixture<ProductInfoComponent>;
  let productServiceSpy;
  let generalServiceSpy;
  let businessServiceSpy;
  let filterServiceSpy;
  let store: Store<IAppState>;

  beforeEach(async(() => {
    businessServiceSpy = jasmine.createSpyObj("BusinessService", ["dispatchGetBusinessDetail"]);
    filterServiceSpy = jasmine.createSpyObj("FilterService", [
      "selectTypeInFilter",
      "selectTagInFilter"
    ]);

    productServiceSpy = jasmine.createSpyObj("ProductService", [
      "setProductFilters",
      "setProductFilterTypes",
      "getProductFilterTypes",
      "setProductFilterTags",
      "getProductFilterTags",
      "updateProductFilters",
      "dispatchSearchProducts",
      "getProducts"
    ]);

    generalServiceSpy = jasmine.createSpyObj("GeneralService", [
      "setGeneralFilters",
      "getGeneralFilters"
    ]);

    productServiceSpy.getProducts.and.returnValue(businessObj);

    TestBed.configureTestingModule({
      declarations: [ProductInfoComponent],
      providers: [
        { provide: BusinessService, useValue: businessServiceSpy },
        { provide: GeneralService, useValue: generalServiceSpy },
        { provide: ProductService, useValue: productServiceSpy },
        { provide: FiltersService, useValue: filterServiceSpy }
      ],

      imports: [StoreModule.forRoot(appReducers), HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();

    store = TestBed.get(Store);
    spyOn(store, "dispatch").and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call subscribe in ngOnInit for getting products", () => {
    spyOn(component.productsSelector, "subscribe").and.returnValue(of());
    spyOn(component.productsFilterSelector, "subscribe").and.returnValue(of());
    spyOn(component.generalFiltersSelector, "subscribe").and.returnValue(of());
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.productsSelector.subscribe).toHaveBeenCalled();
    expect(component.productsFilterSelector.subscribe).toHaveBeenCalled();
    expect(component.generalFiltersSelector.subscribe).toHaveBeenCalled();
  });
  it("should emit numberOfShownBusinesses inside subscribe for products", () => {
    const observableParam = cold("a|", { a: businessObj });
    component.productsSelector = observableParam;
    component.productsFilterSelector = observableParam;
    component.generalFiltersSelector = observableParam;

    const numProductsSpyOn = spyOn(component.numberOfShownProducts, "next");

    component.ngOnInit();
    fixture.detectChanges();
    getTestScheduler().flush();

    expect(numProductsSpyOn).toHaveBeenCalled();
    expect(productServiceSpy.setProductFilters).toHaveBeenCalled();
    expect(generalServiceSpy.setGeneralFilters).toHaveBeenCalled();
    expect(component.subscriptionsArr.length).toBeGreaterThan(2);
  });

  it("should dispatch business detail action using openDetailDrawer", () => {
    component.openDetailDrawer(1);
    expect(businessServiceSpy.dispatchGetBusinessDetail).toHaveBeenCalled();
  });
  it("should unsubscribe to subscriptions", () => {
    const sub1 = of().subscribe();
    component.subscriptionsArr.push(sub1);
    const unsubscriber = spyOn(component.subscriptionsArr[0], "unsubscribe");

    component.ngOnDestroy();

    expect(unsubscriber).toHaveBeenCalled();
  });
  it("should update type selection using updateProductTypeSelect", () => {
    component.updateProductTypeSelection(1);
    expect(productServiceSpy.setProductFilterTypes).toHaveBeenCalled();
    expect(filterServiceSpy.selectTypeInFilter).toHaveBeenCalled();
    expect(productServiceSpy.getProductFilterTypes).toHaveBeenCalled();
  });
  it("should search product type using searchByProductType", () => {
    const updateProductTypeSelectionSpy = spyOn(component, "updateProductTypeSelection");
    const sendRequestSpy = spyOn(component, "sendRequest");
    component.searchByProductType(1);
    expect(updateProductTypeSelectionSpy).toHaveBeenCalled();
    expect(sendRequestSpy).toHaveBeenCalled();
  });
  it("should search product by tag using searchByTag", () => {
    const sendRequestSpy = spyOn(component, "sendRequest");
    component.searchByTag(1);

    expect(productServiceSpy.setProductFilterTags).toHaveBeenCalled();
    expect(filterServiceSpy.selectTagInFilter).toHaveBeenCalled();
    expect(productServiceSpy.getProductFilterTags).toHaveBeenCalled();
    expect(sendRequestSpy).toHaveBeenCalled();
  });

  it("should send request for search products using sendRequest", () => {
    component.sendRequest();

    expect(productServiceSpy.updateProductFilters).toHaveBeenCalled();
    expect(productServiceSpy.dispatchSearchProducts).toHaveBeenCalled();
  });
  it("should HighlightMarker also simulate using the mouseenter and mouseleave events", () => {
    component.productsSelector = cold("a|", { a: businessObj });
    component.ngOnInit();
    fixture.detectChanges();
    getTestScheduler().flush();

    let businessInfoItem = fixture.debugElement.queryAll(By.css(".product-parent-tag"));
    let businessInfoItemNative: HTMLElement = businessInfoItem[0].nativeElement;

    const highlightMarkerAction = new HighlightMapMarker({
      highlightedMarkerID: 0,
      highlighted: true
    });
    const highlightMarkerAction2 = new HighlightMapMarker({
      highlightedMarkerID: 0,
      highlighted: false
    });

    const mouseenter = new MouseEvent("mouseenter");
    const mouseleave = new MouseEvent("mouseleave");
    businessInfoItemNative.dispatchEvent(mouseenter);
    businessInfoItemNative.dispatchEvent(mouseleave);

    component.highlightMarker(0, true);

    expect(businessInfoItem.length).toBe(2);
    expect(store.dispatch).toHaveBeenCalledWith(highlightMarkerAction);
    expect(store.dispatch).toHaveBeenCalledWith(highlightMarkerAction2);
    expect(store.dispatch).toHaveBeenCalledTimes(3);
  });
});
