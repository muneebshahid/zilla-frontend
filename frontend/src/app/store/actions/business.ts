import { Action } from "@ngrx/store";

export enum EBusinessActions {
  GetExploreBusiness = "[Business] Get Explore Business",
  GetExploreBusinessSuccess = "[Business] Get Explore Business Success",
  GetSearchBusiness = "[Business] Get Search Business",
  GetSearchBusinessSuccess = "[Business] Get Search Business Success",
  GetBusinessDetail = "[Business] Get Business Detail",
  GetBusinessDetailSuccess = "[Business] Get Business Detail Success",
  UpdateBusinessFilters = "[Business] Update Business Filters",
  GetBusinessTypes = "[Business] Get Business Types",
  GetBusinessTypesSuccess = "[Business] Get Business Types Success",
  GetBusinessAmenities = "[Business] Get Business Amenities",
  GetBusinessAmenitiesSuccess = "[Business] Get Business Amenities Success"
}

export class GetExploreBusiness implements Action {
  public readonly type = EBusinessActions.GetExploreBusiness;
}
export class GetExploreBusinessSuccess implements Action {
  public readonly type = EBusinessActions.GetExploreBusinessSuccess;

  constructor(public payload: any) {}
}
export class GetBusinessTypes implements Action {
  public readonly type = EBusinessActions.GetBusinessTypes;
}
export class GetBusinessTypesSuccess implements Action {
  public readonly type = EBusinessActions.GetBusinessTypesSuccess;

  constructor(public payload: any) {}
}

export class GetBusinessAmenities implements Action {
  public readonly type = EBusinessActions.GetBusinessAmenities;
}
export class GetBusinessAmenitiesSuccess implements Action {
  public readonly type = EBusinessActions.GetBusinessAmenitiesSuccess;

  constructor(public payload: any) {}
}

export class GetSearchBusiness implements Action {
  public readonly type = EBusinessActions.GetSearchBusiness;

  constructor(public payload: any) {}
}
export class GetSearchBusinessSuccess implements Action {
  public readonly type = EBusinessActions.GetSearchBusinessSuccess;

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
export class UpdateBusinessFilters implements Action {
  public readonly type = EBusinessActions.UpdateBusinessFilters;

  constructor(public payload: any) {}
}

export type BusinessActions =
  | GetExploreBusiness
  | GetExploreBusinessSuccess
  | UpdateBusinessFilters
  | GetBusinessDetail
  | GetBusinessDetailSuccess
  | GetSearchBusiness
  | GetBusinessAmenities
  | GetBusinessAmenitiesSuccess
  | GetBusinessTypes
  | GetBusinessTypesSuccess
  | GetSearchBusinessSuccess;
