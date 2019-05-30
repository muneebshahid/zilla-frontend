import { Action } from "@ngrx/store";

export enum EProductActions {
  GetProductDetails = "[Product] Get Product Details"
}

export class GetProductDetails implements Action {
  public readonly type = EProductActions.GetProductDetails;

  // send item id as payload
  constructor(public payload: number) {}
}

export type ProductActions = GetProductDetails;
