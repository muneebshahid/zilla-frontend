import { Action } from "@ngrx/store";

export enum EBusinessActions {
  GetExploreBusiness = "[Business] Get Explore Business",
  GetExploreBusinessSuccess = "[Business] Get Explore Business Success",
  GetBusinessDetail = "[Business] Get Business Detail",
  GetBusinessDetailSuccess = "[Business] Get Business Detail Success"
}

export class GetExploreBusiness implements Action {
  public readonly type = EBusinessActions.GetExploreBusiness;
}
export class GetExploreBusinessSuccess implements Action {
  public readonly type = EBusinessActions.GetExploreBusinessSuccess;

  constructor(public payload: any) {}
}

export class GetBusinessDetail implements Action {
  public readonly type = EBusinessActions.GetBusinessDetail;

  constructor(public payload: any) {}
}
export class GetBusinessDetailSuccess implements Action {
  public readonly type = EBusinessActions.GetBusinessDetailSuccess;

  constructor(public payload: any) {}
}

export type BusinessActions =
  | GetExploreBusiness
  | GetExploreBusinessSuccess
  | GetBusinessDetail
  | GetBusinessDetailSuccess;
