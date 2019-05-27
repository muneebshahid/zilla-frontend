import { ItemActions, EItemActions } from '../actions/item';
import { initialItemState } from '../state/item';
import { IItem } from '../../models/item'

export const itemReducers = (
  state = initialItemState,
  action: ItemActions
): IItem => {
  switch (action.type) {
    case EItemActions.GetItemDetails: {
      return {
        ...state,
        id: action.payload
      };
    }

    default:
      return state;
  }
};