import { Action } from "@ngrx/store";

export enum EGeneralActions {
  UpdateSearchType = "[General] Update Search Types",
  UpdateGeneralFilters = "[General] Update General Filters",
  HighlightMapMarker = "[General] Highlight Map Marker",
  UpdateCloseDetailDrawer = "[General] Close Detail Drawer",
  UpdateDefaultCity = "[General] Update Default City"
}

export class UpdateSearchType implements Action {
  public readonly type = EGeneralActions.UpdateSearchType;

  constructor(public payload: any) {}
}
export class HighlightMapMarker implements Action {
  public readonly type = EGeneralActions.HighlightMapMarker;
  constructor(public payload: any) {}
}
export class UpdateGeneralFilters implements Action {
  public readonly type = EGeneralActions.UpdateGeneralFilters;

  constructor(public payload: any) {}
}
export class UpdateCloseDetailDrawer implements Action {
  public readonly type = EGeneralActions.UpdateCloseDetailDrawer;

  constructor(public payload: any) {}
}
export class UpdateDefaultCity implements Action {
  public readonly type = EGeneralActions.UpdateDefaultCity;

  constructor(public payload: any) {}
}

export type GeneralActions =
  | UpdateSearchType
  | HighlightMapMarker
  | UpdateGeneralFilters
  | UpdateCloseDetailDrawer
  | UpdateDefaultCity;
