import { Action } from "@ngrx/store";

export enum EBusinessActions {
  GetExploreBusiness = "[Business] Get Explore Business",
  GetExploreBusinessSuccess = "[Business] Get Explore Business Success"
}

export class GetExploreBusiness implements Action {
  public readonly type = EBusinessActions.GetExploreBusiness;

  /* Send the lat lng for getting closeby businesses to explore */
  constructor(public payload: any) {}
}
export class GetExploreBusinessSuccess implements Action {
  public readonly type = EBusinessActions.GetExploreBusinessSuccess;

  constructor(public payload: any) {}
}

export type BusinessActions = GetExploreBusiness | GetExploreBusinessSuccess;
