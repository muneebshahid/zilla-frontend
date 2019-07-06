import {
  GetProductDetails,
  GetProductDetailsSuccess,
  GetSearchProducts,
  GetSearchProductsSuccess
} from "./../actions/product";
import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";

import { GetProductsOfBusiness, GetProductsOfBusinessSuccess } from "../actions/product";

import { ProductService } from "../../services/product/product.service";
import { EProductActions } from "../actions/product";

@Injectable()
export class ProductEffects {
  @Effect()
  getSearchProducts$ = this.actions$.pipe(
    ofType<GetSearchProducts>(EProductActions.GetSearchProducts),
    map(action => action.payload),
    switchMap(params => {
      return this.productService
        .getSearchProducts(params)
        .pipe(map(products => new GetSearchProductsSuccess(products)));
    })
  );
  @Effect()
  getProductsOfBusiness$ = this.actions$.pipe(
    ofType<GetProductsOfBusiness>(EProductActions.GetProductsOfBusiness),
    map(action => action.payload),
    switchMap(payload => {
      return this.productService
        .getProductsOfBusiness(payload)
        .pipe(map(products => new GetProductsOfBusinessSuccess(products)));
    })
  );
  @Effect()
  getProductDetails$ = this.actions$.pipe(
    ofType<GetProductDetails>(EProductActions.GetProductDetails),
    map(action => action.payload),
    switchMap(payload => {
      return this.productService
        .getProductDetails(payload)
        .pipe(map(products => new GetProductDetailsSuccess(products)));
    })
  );

  constructor(private productService: ProductService, private actions$: Actions) {}
}
