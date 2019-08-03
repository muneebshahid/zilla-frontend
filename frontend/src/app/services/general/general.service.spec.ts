import { TestBed } from "@angular/core/testing";

import { GeneralService } from "./general.service";
import { StoreModule } from "@ngrx/store";
import { appReducers } from "src/app/store/reducers/app.reducer";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

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
});
