import { IAppState } from "./../state/app.state";
import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";

import { GetExploreBusiness, GetExploreBusinessSuccess } from "../actions/business";

import { BusinessService } from "../../services/business/business.service";
import { EBusinessActions } from "../actions/business";

@Injectable()
export class ProductEffects {
  @Effect()
  getExploreBusinesses$ = this.actions$.pipe(
    ofType<GetExploreBusiness>(EBusinessActions.GetExploreBusiness),
    map(action => action.payload),
    switchMap(payload => {
      return this.businessService
        .getExploreBusiness(payload)
        .pipe(map(businesses => new GetExploreBusinessSuccess(businesses)));
    })
  );

  constructor(
    private businessService: BusinessService,
    private actions$: Actions,
    private store: Store<IAppState>
  ) {}
}
