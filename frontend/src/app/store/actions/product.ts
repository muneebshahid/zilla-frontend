import { Action } from "@ngrx/store";

export enum EProductActions {
  GetProductDetails = "[Product] Get Product Details",
  GetProductDetailsSuccess = "[Product] Get Product Details Success",

  GetSearchProducts = "[Product] Get Search Products",
  GetSearchProductsSuccess = "[Product] Get Search Products Success",

  GetProductsOfBusiness = "[Product] Get Products of Business",
  GetProductsOfBusinessSuccess = "[Product] Get Products of Business Success",

  GetProductTypes = "[Product] Get Product types",
  GetProductTypesSuccess = "[Product] Get Product types Success",
  GetProductTags = "[Product] Get Product tags",
  GetProductTagsSuccess = "[Product] Get Product tags Success",
  UpdateProductFilters = "[Product] Update Product Filters"
}

export class GetProductTypes implements Action {
  public readonly type = EProductActions.GetProductTypes;
}
export class GetProductTypesSuccess implements Action {
  public readonly type = EProductActions.GetProductTypesSuccess;
  constructor(public payload: any) {}
}
export class GetProductTags implements Action {
  public readonly type = EProductActions.GetProductTags;
}
export class GetProductTagsSuccess implements Action {
  public readonly type = EProductActions.GetProductTagsSuccess;
  constructor(public payload: any) {}
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
export class GetSearchProducts implements Action {
  public readonly type = EProductActions.GetSearchProducts;

  // latlng as payload
  constructor(public payload: any) {}
}
export class GetSearchProductsSuccess implements Action {
  public readonly type = EProductActions.GetSearchProductsSuccess;

  // products as payload
  constructor(public payload: any) {}
}

export class GetProductDetailsSuccess implements Action {
  public readonly type = EProductActions.GetProductDetailsSuccess;

  // product details as payload
  constructor(public payload: any) {}
}
export class UpdateProductFilters implements Action {
  public readonly type = EProductActions.UpdateProductFilters;

  constructor(public payload: any) {}
}

export type ProductActions =
  | GetProductDetails
  | GetProductDetailsSuccess
  | GetProductsOfBusiness
  | GetProductsOfBusinessSuccess
  | GetSearchProducts
  | GetProductTags
  | GetProductTagsSuccess
  | GetProductTypes
  | GetProductTypesSuccess
  | GetSearchProductsSuccess
  | UpdateProductFilters;
