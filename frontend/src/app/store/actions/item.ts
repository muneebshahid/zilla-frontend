import { Action } from '@ngrx/store';
import { IItem } from '../../models/item';

export enum EItemActions {
  GetItemDetails = '[Item] Get Item Details',
}

export class GetItemDetails implements Action {
  public readonly type = EItemActions.GetItemDetails;

  // send item id as payload
  constructor(public payload: number) {}
}

export type ItemActions = GetItemDetails;