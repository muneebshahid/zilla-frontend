import { createSelector } from "@ngrx/store";

import { IAppState } from "../state/app.state";
import { IBusinessState } from "../state/business";

const selectItems = (state: IAppState) => state.businesses;

export const selectBusinesses = createSelector(
  selectItems,
  (state: IBusinessState) => state.businesses
);
