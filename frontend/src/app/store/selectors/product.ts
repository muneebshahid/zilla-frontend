import { createSelector } from "@ngrx/store";

import { IAppState } from "../state/app.state";
import { IProduct } from "../../models/product";

const selectItems = (state: IAppState) => state.products;

export const selectItemID = createSelector(
  selectItems,
  (state: IProduct) => state.id
);

export const selectItemImages = createSelector(
  selectItems,
  (state: IProduct) => state.images
);
export const selectItemOwner = createSelector(
  selectItems,
  (state: IProduct) => state.owner
);
export const selectItemPrice = createSelector(
  selectItems,
  (state: IProduct) => state.price
);
export const selectItemTags = createSelector(
  selectItems,
  (state: IProduct) => state.tags
);
export const selectItemHidden = createSelector(
  selectItems,
  (state: IProduct) => state.hidden
);
export const selectItemDescription = createSelector(
  selectItems,
  (state: IProduct) => state.description
);
export const selectItemAvailable = createSelector(
  selectItems,
  (state: IProduct) => state.available
);
