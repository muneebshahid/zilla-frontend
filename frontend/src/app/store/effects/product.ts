import { IAppState } from "./../state/app.state";
import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";

import { GetNearbyProducts, GetNearbyProductsSuccess } from "../actions/product";

import { ProductService } from "../../services/product/product.service";
import { EProductActions } from "../actions/product";
import { of } from "rxjs";

@Injectable()
export class ProductEffects {
  @Effect()
  getNearbyProducts$ = this.actions$.pipe(
    ofType<GetNearbyProducts>(EProductActions.GetNearbyProducts),
    map(action => action.payload),
    switchMap(payload => {
      const obs = this.productService.getNearbyProducts(payload);
      return of(new GetNearbyProductsSuccess(obs));
    })
  );

  constructor(
    private productService: ProductService,
    private actions$: Actions,
    private store: Store<IAppState>
  ) {}
}
