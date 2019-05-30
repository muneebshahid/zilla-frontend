import { Action } from "@ngrx/store";

export enum EProductActions {
  GetProductDetails = "[Product] Get Product Details",
  GetProductDetailsSuccess = "[Product] Get Product Details Success"
}

export class GetProductDetails implements Action {
  public readonly type = EProductActions.GetProductDetails;

  // send item id as payload
  constructor(public payload: number) {}
}

export class GetProductDetailsSuccess implements Action {
  public readonly type = EProductActions.GetProductDetailsSuccess;

  constructor() {}
}

export type ProductActions = GetProductDetails | GetProductDetailsSuccess;
