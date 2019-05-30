import { IAppState } from "./../state/app.state";
import { Store, Action } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { map, switchMap, mergeMap } from "rxjs/operators";

import { GetProductDetails, GetProductDetailsSuccess } from "../actions/product";

import { ProductService } from "../../services/product/product.service";
import { EProductActions } from "../actions/product";
import { Observable, of } from "rxjs";

@Injectable()
export class ProductEffects {
  @Effect()
  getProductDetail$ = this.actions$.pipe(
    ofType<GetProductDetails>(EProductActions.GetProductDetails),
    map(action => action.payload),
    switchMap(payload => {
      this.productService.getProducts(payload);
      return of(new GetProductDetailsSuccess());
    })
  );

  constructor(
    private productService: ProductService,
    private actions$: Actions,
    private store: Store<IAppState>
  ) {}
}
