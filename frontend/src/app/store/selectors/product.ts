import { createSelector } from "@ngrx/store";

import { IAppState } from "../state/app.state";
import { IProductState } from "../state/product";

const selectItems = (state: IAppState) => state.products;

export const selectProducts = createSelector(
  selectItems,
  (state: IProductState) => state.products
);

export const selectProduct = createSelector(
  selectItems,
  (state: IProductState) => state.product
);
