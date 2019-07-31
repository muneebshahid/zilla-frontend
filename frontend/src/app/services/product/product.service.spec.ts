import { TestBed } from "@angular/core/testing";

import { ProductService } from "./product.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { IProduct } from "src/app/models/product";
import { of } from "rxjs";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { IAppState } from "src/app/store/state/app.state";
import { Store } from "@ngrx/store";
import { productsObj, storeInitialState } from "src/app/testing/models";

describe("ProductService", () => {
  let store: MockStore<IAppState>;
  const initialState = storeInitialState;

  let stubValue;
  let httpServiceSpy;
  let filterServiceSpy;
  let productService;
  const emptyObs: IProduct[] = productsObj;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore({ initialState })
        // other providers
      ]
    });
    store = TestBed.get(Store);
    httpServiceSpy = jasmine.createSpyObj("HttpService", ["get"]);
    filterServiceSpy = jasmine.createSpyObj("FilterService", ["get"]);
    stubValue = of(emptyObs[0]);
    httpServiceSpy.get.and.returnValue(stubValue);
    productService = new ProductService(httpServiceSpy, filterServiceSpy, store);
  });

  it("should be created", () => {
    const service: ProductService = TestBed.get(ProductService);
    expect(service).toBeTruthy();
  });

  it("#getProductDetails should return stubbed observable value", () => {
    // set the value to return when the `get` spy is called.

    expect(productService.getProductDetails("dummy-slug-id")).toBe(
      stubValue,
      "service returned stub value"
    );
    expect(httpServiceSpy.get.calls.count()).toBe(1, "spy method was called once");
    expect(httpServiceSpy.get.calls.mostRecent().returnValue).toBe(stubValue);
  });

  it("#getNearbyProducts should return stubbed observable value", () => {
    expect(productService.getNearbyProducts("dummy-slug-id")).toBe(
      stubValue,
      "service returned stub value"
    );
    expect(httpServiceSpy.get.calls.count()).toBe(1, "spy method was called once");
    expect(httpServiceSpy.get.calls.mostRecent().returnValue).toBe(stubValue);
  });

  it("#getProductsOfBusiness should return stubbed observable value", () => {
    expect(productService.getProductsOfBusiness("dummy-slug-id")).toBe(
      stubValue,
      "service returned stub value"
    );
    expect(httpServiceSpy.get.calls.count()).toBe(1, "spy method was called once");
    expect(httpServiceSpy.get.calls.mostRecent().returnValue).toBe(stubValue);
  });
});
