import { createSelector } from "@ngrx/store";

import { IAppState } from "../state/app.state";
import { IBusinessState } from "../state/business";

const selectItems = (state: IAppState) => state.businesses;

export const selectBusinesses = createSelector(
  selectItems,
  (state: IBusinessState) => state.businesses
);
export const selectBusiness = createSelector(
  selectItems,
  (state: IBusinessState) => state.business
);

export const selectNumHits = createSelector(
  selectItems,
  (state: IBusinessState) => state.num_hits
);
