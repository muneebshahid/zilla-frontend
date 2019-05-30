import { IAppState } from "./../state/app.state";
import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { map } from "rxjs/operators";

import { GetProductDetails, GetProductDetailsSuccess } from "../actions/product";

import { ProductService } from "../../services/product/product.service";
import { EProductActions } from "../actions/product";

@Injectable()
export class ProductEffects {
  @Effect()
  getProductDetail$ = this._actions$.pipe(
    ofType<GetProductDetails>(EProductActions.GetProductDetails),
    map(action => {
      console.log("china");
      console.log(this.productService.getProductDetails(action.payload));
      this._store.dispatch(new GetProductDetailsSuccess());
    })
  );

  constructor(
    private productService: ProductService,
    private _actions$: Actions,
    private _store: Store<IAppState>
  ) {}
}
