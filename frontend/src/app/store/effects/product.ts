import {
  GetProductDetails,
  GetProductDetailsSuccess,
  GetSearchProducts,
  GetSearchProductsSuccess,
  GetProductTypes,
  GetProductTypesSuccess,
  GetProductTagsSuccess,
  GetProductTags
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
  @Effect()
  getProductTypes$ = this.actions$.pipe(
    ofType<GetProductTypes>(EProductActions.GetProductTypes),
    switchMap(() => {
      return this.productService
        .getProductTypes()
        .pipe(map(products => new GetProductTypesSuccess(products)));
    })
  );
  @Effect()
  getProductTags$ = this.actions$.pipe(
    ofType<GetProductTags>(EProductActions.GetProductTags),
    switchMap(() => {
      return this.productService
        .getProductTags()
        .pipe(map(products => new GetProductTagsSuccess(products)));
    })
  );

  constructor(private productService: ProductService, private actions$: Actions) {}
}
