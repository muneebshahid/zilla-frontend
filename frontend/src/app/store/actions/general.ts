import { Action } from "@ngrx/store";

export enum EGeneralActions {
  UpdateSearchType = "[General] Update Search Types"
}

export class UpdateSearchType implements Action {
  public readonly type = EGeneralActions.UpdateSearchType;

  constructor(public payload: any) {}
}

export type GeneralActions = UpdateSearchType;
