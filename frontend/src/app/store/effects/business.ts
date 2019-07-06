import { GetBusinessDetailSuccess } from "./../actions/business";
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

  constructor(private businessService: BusinessService, private actions$: Actions) {}
}
