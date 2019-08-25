import {
  GetBusinessDetailSuccess,
  GetSearchBusiness,
  GetSearchBusinessSuccess,
  GetBusinessTypesSuccess,
  GetBusinessTypes,
  GetBusinessAmenities,
  GetBusinessAmenitiesSuccess
} from "../../actions/business";
import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { map, switchMap, concatMap } from "rxjs/operators";

import { GetBusinessDetail } from "../../actions/business";

import { BusinessService } from "../../../services/business/business.service";
import { EBusinessActions } from "../../actions/business";
import { GeneralService } from "src/app/services/general/general.service";

@Injectable()
export class BusinessEffects {
  @Effect()
  getBusinessesDetail$ = this.actions$.pipe(
    ofType<GetBusinessDetail>(EBusinessActions.GetBusinessDetail),
    map(action => {
      this.generalService.updateLoadingSign(true);
      return action.payload;
    }),
    switchMap(payload => this.businessService.getBusinessDetail(payload)),
    map(businessDetails => {
      this.generalService.updateLoadingSign(false);
      return new GetBusinessDetailSuccess(businessDetails);
    })
  );
  @Effect()
  getSearchBusinesses$ = this.actions$.pipe(
    ofType<GetSearchBusiness>(EBusinessActions.GetSearchBusiness),
    map(action => {
      this.generalService.updateLoadingSign(true);
      return action.payload;
    }),
    concatMap(payload => this.businessService.getSearchBusinesses(payload)),
    map(data => {
      this.businessService.setBusinesses(
        data.hits,
        []
        // this.businessService.getMarkersFromPayload(data.hits)
      );
      this.generalService.updateLoadingSign(false);

      return new GetSearchBusinessSuccess({
        businesses: this.businessService.getBusinesses(),
        markers: this.businessService.getBusinessesMarkers(),
        num_hits: data.num_hits
      });
    })
  );
  @Effect()
  getBusinessTypes$ = this.actions$.pipe(
    ofType<GetBusinessTypes>(EBusinessActions.GetBusinessTypes),
    switchMap(() => this.businessService.getBusinesstypes()),
    map(businessTypes => new GetBusinessTypesSuccess(businessTypes))
  );
  @Effect()
  getBusinessAmenities$ = this.actions$.pipe(
    ofType<GetBusinessAmenities>(EBusinessActions.GetBusinessAmenities),
    switchMap(() => this.businessService.getBusinessAmenities()),
    map(businessAmenities => new GetBusinessAmenitiesSuccess(businessAmenities))
  );

  constructor(
    private businessService: BusinessService,
    private generalService: GeneralService,
    private actions$: Actions
  ) {}
}
