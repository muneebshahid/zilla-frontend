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
export const selectBusinessFilter = createSelector(
  selectItems,
  (state: IBusinessState) => state.filters
);
export const selectBusinessFilterLatLonDis = createSelector(
  selectItems,
  (state: IBusinessState) => state.filters.latlondis
);

export const selectNumHits = createSelector(
  selectItems,
  (state: IBusinessState) => state.num_hits
);
export const selectBusinessMarkers = createSelector(
  selectItems,
  (state: IBusinessState) => state.markers
);
export const selectBusinessTypes = createSelector(
  selectItems,
  (state: IBusinessState) => state.businessTypes
);

export const selectBusinessAmenities = createSelector(
  selectItems,
  (state: IBusinessState) => state.businessAmenities
);
