import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IItem } from '../../models/item';

const selectItems = (state: IAppState) => state.items;

export const selectItemID = createSelector(
  selectItems,
  (state: IItem) => state.id
);

export const selectItemImages = createSelector(
  selectItems,
  (state: IItem) => state.images
);
export const selectItemOwner = createSelector(
  selectItems,
  (state: IItem) => state.owner
);
export const selectItemPrice = createSelector(
  selectItems,
  (state: IItem) => state.price
);
export const selectItemTags = createSelector(
  selectItems,
  (state: IItem) => state.tags
);
export const selectItemHidden = createSelector(
  selectItems,
  (state: IItem) => state.hidden
);
export const selectItemDescription = createSelector(
  selectItems,
  (state: IItem) => state.description
);
export const selectItemAvailable = createSelector(
  selectItems,
  (state: IItem) => state.available
);