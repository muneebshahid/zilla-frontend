import { RouterReducerState } from '@ngrx/router-store';

import { initialItemState } from './item';
import { IItem } from '../../models/item'


export interface IAppState {
  router?: RouterReducerState;
  items: IItem;
}

export const initialAppState: IAppState = {
  items: initialItemState
};

export function getInitialState(): IAppState {
  return initialAppState;
}