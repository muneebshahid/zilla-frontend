import { createSelector } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { IGeneralState } from "../state/general";

const selectItems = (state: IAppState) => state.general;

export const selectShowingBusinesses = createSelector(
  selectItems,
  (state: IGeneralState) => state.showingBusinesses
);
