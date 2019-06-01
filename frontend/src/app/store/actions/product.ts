import { Action } from "@ngrx/store";

export enum EProductActions {
  GetProductDetails = "[Product] Get Product Details",
  GetProductDetailsSuccess = "[Product] Get Product Details Success",

  GetNearbyProducts = "[Product] Get Nearby Products",
  GetNearbyProductsSuccess = "[Product] Get Nearby Products Success"
}

export class GetProductDetails implements Action {
  public readonly type = EProductActions.GetProductDetails;

  // send item id as payload
  constructor(public payload: number) {}
}
export class GetNearbyProducts implements Action {
  public readonly type = EProductActions.GetNearbyProducts;

  // send item id as payload
  constructor(public payload: any) {}
}
export class GetNearbyProductsSuccess implements Action {
  public readonly type = EProductActions.GetNearbyProductsSuccess;

  // send item id as payload
  constructor(public payload: any) {}
}

export class GetProductDetailsSuccess implements Action {
  public readonly type = EProductActions.GetProductDetailsSuccess;

  constructor() {}
}

export type ProductActions =
  | GetProductDetails
  | GetProductDetailsSuccess
  | GetNearbyProducts
  | GetNearbyProductsSuccess;
