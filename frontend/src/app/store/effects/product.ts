import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { Store, select } from "@ngrx/store";
import { of } from "rxjs";
import { switchMap, map, withLatestFrom } from "rxjs/operators";

import { IAppState } from "../state/app.state";
import { GetProductDetails } from "../actions/product";

import { ProductService } from "../../services/item/product.service";
import { EProductActions } from "../actions/product";

@Injectable()
export class ProductEffects {
  @Effect()
  getItemDetail$ = this._actions$.pipe(
    ofType<GetProductDetails>(EProductActions.GetProductDetails),
    map(output => {
      console.log(output);
    })
  );

  constructor(private itemService: ProductService, private _actions$: Actions) {}
}
