import { Action } from "@ngrx/store";

export enum EGeneralActions {
  UpdateSearchType = "[General] Update Search Types",
  HighlightMapMarker = "[General] Highlight Map Marker"
}

export class UpdateSearchType implements Action {
  public readonly type = EGeneralActions.UpdateSearchType;

  constructor(public payload: any) {}
}
export class HighlightMapMarker implements Action {
  public readonly type = EGeneralActions.HighlightMapMarker;
  constructor(public payload: any) {}
}

export type GeneralActions = UpdateSearchType | HighlightMapMarker;
