import { createSelector } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { IGeneralState } from "../state/general";

const selectItems = (state: IAppState) => state.general;

export const selectShowingBusinesses = createSelector(
  selectItems,
  (state: IGeneralState) => state.showingBusinesses
);
export const selectMarkerHighlighting = createSelector(
  selectItems,
  (state: IGeneralState) => {
    return { highlighted: state.highlighted, markerID: state.highlightedMarkerID };
  }
);
export const selectGeneralFilters = createSelector(
  selectItems,
  (state: IGeneralState) => {
    return state.generalFilters;
  }
);
export const selectdefaultGeneralFilter = createSelector(
  selectItems,
  (state: IGeneralState) => {
    return state.defaultGeneralFilter;
  }
);
export const selectCloseDetailDrawer = createSelector(
  selectItems,
  (state: IGeneralState) => {
    return state.closeDetailDrawer;
  }
);
