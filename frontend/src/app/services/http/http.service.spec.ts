import { TestBed } from "@angular/core/testing";

import { HttpService } from "./http.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { IBusiness } from "src/app/models/business";
import { asyncData } from "src/app/testing/async-observable-helpers";

describe("HttpService", () => {
  let httpClientSpy: { get: jasmine.Spy };
  let httpService: HttpService;
  const emptyObs: IBusiness[] = [
    {
      id: 0,
      images: [],
      business_type: Object.assign({}),
      opening_timings: [],
      is_open: false,
      title: "",
      slug: "",
      description: "",
      website: "",
      address: "",
      claimed: false,
      phone: "",
      expensive: 0,
      latlon: [],
      amenities: [],
      products: []
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
    httpService = new HttpService(<any>httpClientSpy);
  });

  it("should be created", () => {
    expect(httpService).toBeTruthy();
  });

  it("should return expected IBusiness (HttpClient called once)", () => {
    httpClientSpy.get.and.returnValue(asyncData(emptyObs));
    httpService
      .get("DUMMY_URL")
      .subscribe(result => expect(result).toEqual(emptyObs, "expected result"), fail);
    expect(httpClientSpy.get.calls.count()).toBe(1, "one call");
  });
});
