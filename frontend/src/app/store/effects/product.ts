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
import { BusinessService } from "src/app/services/business/business.service";
import { GeneralService } from "src/app/services/general/general.service";

@Injectable()
export class ProductEffects {
  @Effect()
  getSearchProducts$ = this.actions$.pipe(
    ofType<GetSearchProducts>(EProductActions.GetSearchProducts),
    map(action => {
      this.generalService.updateLoadingSign(true);
      return action.payload;
    }),
    switchMap(params => this.productService.getSearchProducts(params)),
    map(products => {
      this.generalService.updateLoadingSign(false);
      return new GetSearchProductsSuccess({
        products: products,
        markers: this.businessService.getMarkersFromPayload(products.products)
      });
    })
  );
  @Effect()
  getProductsOfBusiness$ = this.actions$.pipe(
    ofType<GetProductsOfBusiness>(EProductActions.GetProductsOfBusiness),
    map(action => action.payload),
    switchMap(payload => this.productService.getProductsOfBusiness(payload)),
    map(products => {
      return new GetProductsOfBusinessSuccess(products);
    })
  );
  @Effect()
  getProductDetails$ = this.actions$.pipe(
    ofType<GetProductDetails>(EProductActions.GetProductDetails),
    map(action => {
      this.generalService.updateLoadingSign(true);
      return action.payload;
    }),
    switchMap(payload => this.productService.getProductDetails(payload)),
    map(products => {
      this.generalService.updateLoadingSign(false);
      return new GetProductDetailsSuccess(products);
    })
  );
  @Effect()
  getProductTypes$ = this.actions$.pipe(
    ofType<GetProductTypes>(EProductActions.GetProductTypes),
    switchMap(() => this.productService.getProductTypes()),
    map(products => new GetProductTypesSuccess(products))
  );

  @Effect()
  getProductTags$ = this.actions$.pipe(
    ofType<GetProductTags>(EProductActions.GetProductTags),
    switchMap(() => this.productService.getProductTags()),
    map(products => new GetProductTagsSuccess(products))
  );

  constructor(
    private businessService: BusinessService,
    private productService: ProductService,
    private generalService: GeneralService,
    private actions$: Actions
  ) {}
}
