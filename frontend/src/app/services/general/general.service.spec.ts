import { TestBed } from "@angular/core/testing";

import { GeneralService } from "./general.service";
import { StoreModule } from "@ngrx/store";
import { appReducers } from "src/app/store/reducers/app.reducer";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { defaultLatlonDis } from "src/app/store/state/general";

describe("GeneralService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(appReducers), HttpClientTestingModule, RouterTestingModule]
    })
  );

  it("should be created", () => {
    const service: GeneralService = TestBed.get(GeneralService);
    expect(service).toBeTruthy();
  });
  it("should set default latlondis value", () => {
    const service: GeneralService = TestBed.get(GeneralService);
    expect(service.getDefaultLatLonDis()).toBe(defaultLatlonDis);
    service.setDefaultLatLonDis([1, 2, 3]);
    expect(service.getDefaultLatLonDis()[0]).toBe(1);
    expect(service.getDefaultLatLonDis()[1]).toBe(2);
    expect(service.getDefaultLatLonDis()[2]).toBe(3);
  });
});
