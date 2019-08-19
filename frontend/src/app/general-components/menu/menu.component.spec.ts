import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MenuComponent } from "./menu.component";
import { FormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { StoreModule } from "@ngrx/store";
import { appReducers } from "src/app/store/reducers/app.reducer";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { BusinessService } from "src/app/services/business/business.service";
import { GeneralService } from "src/app/services/general/general.service";
import { ProductService } from "src/app/services/product/product.service";
import { cold, getTestScheduler } from "jasmine-marbles";

describe("MenuComponent", () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let businessServiceSpy;
  let generalServiceSpy;
  let productServiceSpy;

  beforeEach(async(() => {
    businessServiceSpy = jasmine.createSpyObj("BusinessService", [
      "setBusinessFilter",
      "dispatchSearchBusinesses"
    ]);

    generalServiceSpy = jasmine.createSpyObj("GeneralService", [
      "setGeneralFilters",
      "setShowBusinesses",
      "setGeneralFilterQuery",
      "updateGeneralFilters",
      "getGeneralFilterQuery",
      "getShowBusinesses",
      "getGeneralFilters"
    ]);

    productServiceSpy = jasmine.createSpyObj("ProductService", [
      "setProductFilters",
      "dispatchSearchProducts"
    ]);

    TestBed.configureTestingModule({
      declarations: [MenuComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        StoreModule.forRoot(appReducers),
        RouterTestingModule
      ],
      providers: [
        { provide: BusinessService, useValue: businessServiceSpy },
        { provide: GeneralService, useValue: generalServiceSpy },
        { provide: ProductService, useValue: productServiceSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should set the generalFilter value in the generalFilterService", () => {
    const observableParam = cold("a|", { a: [] });
    component.generalFiltersSelector = observableParam;
    getTestScheduler().flush();
    expect(generalServiceSpy.setGeneralFilters).toHaveBeenCalled();
  });
  it("should set the businessFilter value in the BusinessFilterService", () => {
    const observableParam = cold("a|", { a: [] });
    component.businessesFilterSelector = observableParam;
    getTestScheduler().flush();
    expect(businessServiceSpy.setBusinessFilter).toHaveBeenCalled();
  });
  it("should set the productFilter value in the ProductFilterService", () => {
    const observableParam = cold("a|", { a: [] });
    component.productsFilterSelector = observableParam;
    getTestScheduler().flush();
    expect(productServiceSpy.setProductFilters).toHaveBeenCalled();
  });
  it("should set showingBusinesses value in the GeneralFilterService", () => {
    const observableParam = cold("a|", { a: [] });
    component.showingBusinessesSelector = observableParam;
    getTestScheduler().flush();
    expect(generalServiceSpy.setShowBusinesses).toHaveBeenCalled();
  });

  it("should not be able to searchResult on query enter", () => {
    component.searchText = "";
    component.searchResults();
    expect(generalServiceSpy.setGeneralFilterQuery).not.toHaveBeenCalled();
  });
  it("should not be able to searchResult on query enter", () => {
    component.searchText = "123";
    generalServiceSpy.getShowBusinesses.and.returnValue(true);

    component.searchResults();
    expect(generalServiceSpy.setGeneralFilterQuery).toHaveBeenCalled();
    expect(generalServiceSpy.getShowBusinesses).toHaveBeenCalled();
    expect(generalServiceSpy.getGeneralFilters).toHaveBeenCalled();
    expect(businessServiceSpy.dispatchSearchBusinesses).toHaveBeenCalled();
    expect(productServiceSpy.dispatchSearchProducts).not.toHaveBeenCalled();
  });
  it("should not be able to searchResult on query enter", () => {
    component.searchText = "123";
    generalServiceSpy.getShowBusinesses.and.returnValue(false);

    component.searchResults();
    expect(generalServiceSpy.setGeneralFilterQuery).toHaveBeenCalled();
    expect(generalServiceSpy.getShowBusinesses).toHaveBeenCalled();
    expect(generalServiceSpy.getGeneralFilters).toHaveBeenCalled();
    expect(businessServiceSpy.dispatchSearchBusinesses).not.toHaveBeenCalled();
    expect(productServiceSpy.dispatchSearchProducts).toHaveBeenCalled();
  });
});
