import { TestBed } from "@angular/core/testing";

import { ProductService } from "./product.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { appReducers } from "src/app/store/reducers/app.reducer";
import { StoreModule } from "@ngrx/store";
import { IPFilters } from "src/app/models/product_filters";
import { defaultPrice } from "src/app/store/state/product";
import { IGFilters } from "src/app/models/general_filters";
import { defaultLatlonDis } from "src/app/store/state/general";
import { dummyFilterTypesAllFalse, dummyFilterTags } from "src/app/testing/models";
import { of } from "rxjs";
import { HttpService } from "../http/http.service";

describe("ProductService", () => {
  let service: ProductService;
  let pParams: IPFilters;
  let gparams: IGFilters;
  let httpServiceSpy;

  beforeEach(() => {
    httpServiceSpy = jasmine.createSpyObj("HttpService", ["get"]);

    httpServiceSpy.get.and.returnValue(of());

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot(appReducers)],
      providers: [{ provide: HttpService, useValue: httpServiceSpy }]
    });
    service = TestBed.get(ProductService);

    pParams = {
      product_types: [],
      tags: [],
      available: -1,
      price: defaultPrice,
      paginate: false,
      paginationInfo: [0, 10, 10]
    };

    gparams = {
      latlondis: defaultLatlonDis,
      query: "",
      city: ""
    };
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  it("should get the default filters after subscription called", () => {
    const defaultFilters = service.getDefaultProductFilters();
    expect(defaultFilters.available).toBe(pParams.available);
    expect(defaultFilters.paginate).toBe(pParams.paginate);
    expect(defaultFilters.paginationInfo[0]).toBe(pParams.paginationInfo[0]);
    expect(defaultFilters.paginationInfo[1]).toBe(pParams.paginationInfo[1]);
    expect(defaultFilters.paginationInfo[2]).toBe(pParams.paginationInfo[2]);
    expect(defaultFilters.price).toBe(pParams.price);
    expect(defaultFilters.product_types.length).toBe(pParams.product_types.length);
    expect(defaultFilters.tags.length).toBe(pParams.tags.length);
  });

  it("should cleanProductFilters and get latlondis before sending the http request", () => {
    service.setProductFilters(pParams);
    const filters = service.cleanProductFilters(pParams, gparams);
    expect(filters.latlondis).toBe("1,2,4");
  });

  it("should cleanProductFilters and get latlondis, query before sending the http request", () => {
    service.setProductFilters(pParams);

    gparams.query = "burger";

    const filters = service.cleanProductFilters(pParams, gparams);
    expect(filters.latlondis).toBe("1,2,4");
    expect(filters.query).toBe("burger");
  });

  it("should cleanProductFilters and get latlondis, price before sending the http request", () => {
    service.setProductFilters(pParams);

    pParams.price = 2000;

    const filters = service.cleanProductFilters(pParams, gparams);
    expect(filters.latlondis).toBe("1,2,4");
    expect(filters.price).toBe(2000);
  });

  it("should cleanProductFilters and get latlondis, product_types before sending the http request", () => {
    service.setProductFilters(pParams);

    pParams.product_types = dummyFilterTypesAllFalse;
    pParams.product_types[0].selected = true;

    const filters = service.cleanProductFilters(pParams, gparams);
    expect(filters.latlondis).toBe("1,2,4");
    expect(filters.product_type).toBe(11);
  });

  it("should cleanProductFilters and get latlondis, tags before sending the http request", () => {
    service.setProductFilters(pParams);

    pParams.tags = dummyFilterTags;

    const filters = service.cleanProductFilters(pParams, gparams);
    expect(filters.latlondis).toBe("1,2,4");
    expect(filters.tags).toBe("11,13");
  });

  it("should cleanProductFilters and get latlondis, paginate before sending the http request", () => {
    service.setProductFilters(Object.assign({}, pParams));

    pParams.paginate = true;

    const filters = service.cleanProductFilters(pParams, gparams);
    expect(filters.latlondis).toBe("1,2,4");
    expect(filters.pagination).toBe(
      `${pParams.paginationInfo[0] + pParams.paginationInfo[2]},${pParams.paginationInfo[1] +
        pParams.paginationInfo[2]}`
    );
  });

  it("should make http request to server for getProductsOfBusiness", () => {
    const serverResponse = service.getProductsOfBusiness(1);
    expect(httpServiceSpy.get).toHaveBeenCalled();
    expect(serverResponse).toBe(of());
  });
});
