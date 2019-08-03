import { TestBed } from "@angular/core/testing";

import { BusinessService } from "./business.service";
import { appReducers } from "src/app/store/reducers/app.reducer";
import { StoreModule } from "@ngrx/store";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

describe("BusinessService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(appReducers), HttpClientTestingModule, RouterTestingModule]
    })
  );

  it("should be created", () => {
    const service: BusinessService = TestBed.get(BusinessService);
    expect(service).toBeTruthy();
  });
});
