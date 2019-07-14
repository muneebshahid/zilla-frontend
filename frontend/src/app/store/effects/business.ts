import {
  GetBusinessDetailSuccess,
  GetSearchBusiness,
  GetSearchBusinessSuccess,
  GetBusinessTypesSuccess,
  GetBusinessTypes,
  GetBusinessAmenities,
  GetBusinessAmenitiesSuccess
} from "./../actions/business";
import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";

import {
  GetExploreBusiness,
  GetExploreBusinessSuccess,
  GetBusinessDetail
} from "../actions/business";

import { BusinessService } from "../../services/business/business.service";
import { EBusinessActions } from "../actions/business";

@Injectable()
export class BusinessEffects {
  @Effect()
  getExploreBusinesses$ = this.actions$.pipe(
    ofType<GetExploreBusiness>(EBusinessActions.GetExploreBusiness),
    switchMap(() => {
      return this.businessService
        .getExploreBusiness()
        .pipe(map(businesses => new GetExploreBusinessSuccess(businesses)));
    })
  );
  @Effect()
  getBusinessesDetail$ = this.actions$.pipe(
    ofType<GetBusinessDetail>(EBusinessActions.GetBusinessDetail),
    map(action => action.payload),
    switchMap(payload => {
      return this.businessService
        .getBusinessDetail(payload)
        .pipe(map(businesses => new GetBusinessDetailSuccess(businesses)));
    })
  );
  @Effect()
  getSearchBusinesses$ = this.actions$.pipe(
    ofType<GetSearchBusiness>(EBusinessActions.GetSearchBusiness),
    map(action => action.payload),
    switchMap(payload => {
      return this.businessService
        .getSearchBusinesses(payload)
        .pipe(map(businesses => new GetSearchBusinessSuccess(businesses)));
    })
  );
  @Effect()
  getBusinessTypes$ = this.actions$.pipe(
    ofType<GetBusinessTypes>(EBusinessActions.GetBusinessTypes),
    switchMap(() => {
      return this.businessService
        .getBusinesstypes()
        .pipe(map(businessTypes => new GetBusinessTypesSuccess(businessTypes)));
    })
  );
  @Effect()
  getBusinessAmenities$ = this.actions$.pipe(
    ofType<GetBusinessAmenities>(EBusinessActions.GetBusinessAmenities),
    switchMap(() => {
      return this.businessService
        .getBusinessAmenities()
        .pipe(map(businessAmenities => new GetBusinessAmenitiesSuccess(businessAmenities)));
    })
  );

  constructor(private businessService: BusinessService, private actions$: Actions) {}
}
