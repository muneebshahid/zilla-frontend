import { TestBed } from "@angular/core/testing";

import { ProductService } from "./product.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { IProduct } from "src/app/models/product";
import { of } from "rxjs";

describe("ProductService", () => {
  const emptyObs: IProduct[] = [
    {
      product: 0,
      tags: [],
      images: [],
      latlng: [],
      title: "",
      slug: "",
      description: "",
      price: 0,
      available: false,
      product_type: Object.assign({}),
      owner: 0,
      expensive: 0
    }
  ];

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  it("should be created", () => {
    const service: ProductService = TestBed.get(ProductService);
    expect(service).toBeTruthy();
  });

  it("#getProductDetails should return stubbed observable value", () => {
    const httpServiceSpy = jasmine.createSpyObj("HttpService", ["get"]);

    // set the value to return when the `get` spy is called.
    const stubValue = of(emptyObs[0]);
    httpServiceSpy.get.and.returnValue(stubValue);

    const businessService = new ProductService(httpServiceSpy);

    expect(businessService.getProductDetails("dummy-slug-id")).toBe(
      stubValue,
      "service returned stub value"
    );
    expect(httpServiceSpy.get.calls.count()).toBe(1, "spy method was called once");
    expect(httpServiceSpy.get.calls.mostRecent().returnValue).toBe(stubValue);
  });

  it("#getNearbyProducts should return stubbed observable value", () => {
    const httpServiceSpy = jasmine.createSpyObj("HttpService", ["get"]);

    // set the value to return when the `get` spy is called.
    const stubValue = of(emptyObs);
    httpServiceSpy.get.and.returnValue(stubValue);

    const businessService = new ProductService(httpServiceSpy);

    expect(businessService.getNearbyProducts("dummy-slug-id")).toBe(
      stubValue,
      "service returned stub value"
    );
    expect(httpServiceSpy.get.calls.count()).toBe(1, "spy method was called once");
    expect(httpServiceSpy.get.calls.mostRecent().returnValue).toBe(stubValue);
  });

  it("#getProductsOfBusiness should return stubbed observable value", () => {
    const httpServiceSpy = jasmine.createSpyObj("HttpService", ["get"]);

    // set the value to return when the `get` spy is called.
    const stubValue = of(emptyObs);
    httpServiceSpy.get.and.returnValue(stubValue);

    const businessService = new ProductService(httpServiceSpy);

    expect(businessService.getProductsOfBusiness("dummy-slug-id")).toBe(
      stubValue,
      "service returned stub value"
    );
    expect(httpServiceSpy.get.calls.count()).toBe(1, "spy method was called once");
    expect(httpServiceSpy.get.calls.mostRecent().returnValue).toBe(stubValue);
  });
});
