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

export const selectProductsNumHits = createSelector(
  selectItems,
  (state: IProductState) => state.num_hits
);
export const selectProductFilter = createSelector(
  selectItems,
  (state: IProductState) => state.filters
);
export const selectProductTags = createSelector(
  selectItems,
  (state: IProductState) => state.product_tags
);
export const selectProductTypes = createSelector(
  selectItems,
  (state: IProductState) => state.product_types
);
