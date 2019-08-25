import { TestBed } from "@angular/core/testing";

import { BusinessEffects } from "./business";
import { appReducers } from "src/app/store/reducers/app.reducer";
import { Store, StoreModule } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Observable } from "rxjs";
import { GeneralService } from "src/app/services/general/general.service";
import { BusinessService } from "src/app/services/business/business.service";
describe("BusinessEffects", () => {
  let effect: BusinessEffects;
  let store: Store<IAppState>;
  let actions: Observable<any>;
  let businessServiceSpy;
  let generalServiceSpy;
  beforeEach(() => {
    businessServiceSpy = jasmine.createSpyObj("BusinessService", [
      "getBusinessAmenities",
      "getBusinesstypes",
      "getBusinessesMarkers",
      "getBusinesses",
      "getSearchBusinesses",
      "getMarkersFromPayload",
      "getBusinessDetail"
    ]);
    generalServiceSpy = jasmine.createSpyObj("GeneralService", ["updateLoadingSign"]);

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(appReducers), HttpClientTestingModule, RouterTestingModule],
      providers: [
        BusinessEffects,
        provideMockActions(() => actions),
        { provide: BusinessService, useValue: businessServiceSpy },
        { provide: GeneralService, useValue: generalServiceSpy }
      ]
    });

    effect = TestBed.get(BusinessEffects);
    store = TestBed.get(Store);
    spyOn(store, "dispatch").and.callThrough();
  });

  it("should be created", () => {
    expect(effect).toBeTruthy();
  });
});
