import { Action } from "@ngrx/store";

export enum EProductActions {
  GetProductDetails = "[Product] Get Product Details",
  GetProductDetailsSuccess = "[Product] Get Product Details Success",

  GetNearbyProducts = "[Product] Get Nearby Products",
  GetNearbyProductsSuccess = "[Product] Get Nearby Products Success",

  GetProductsOfBusiness = "[Product] Get Products of Business",
  GetProductsOfBusinessSuccess = "[Product] Get Products of Business Success"
}

export class GetProductDetails implements Action {
  public readonly type = EProductActions.GetProductDetails;

  // product id as payload
  constructor(public payload: any) {}
}
export class GetProductsOfBusiness implements Action {
  public readonly type = EProductActions.GetProductsOfBusiness;

  // business id as payload
  constructor(public payload: any) {}
}
export class GetProductsOfBusinessSuccess implements Action {
  public readonly type = EProductActions.GetProductsOfBusinessSuccess;

  // products as payload
  constructor(public payload: any) {}
}
export class GetNearbyProducts implements Action {
  public readonly type = EProductActions.GetNearbyProducts;

  // latlng as payload
  constructor(public payload: any) {}
}
export class GetNearbyProductsSuccess implements Action {
  public readonly type = EProductActions.GetNearbyProductsSuccess;

  // products as payload
  constructor(public payload: any) {}
}

export class GetProductDetailsSuccess implements Action {
  public readonly type = EProductActions.GetProductDetailsSuccess;

  // product details as payload
  constructor(public payload: any) {}
}

export type ProductActions =
  | GetProductDetails
  | GetProductDetailsSuccess
  | GetNearbyProducts
  | GetProductsOfBusiness
  | GetProductsOfBusinessSuccess
  | GetNearbyProductsSuccess;
