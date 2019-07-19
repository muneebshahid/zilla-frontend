import { IGFilters } from "src/app/models/general_filters";

export interface IGeneralState {
  showingBusinesses?: boolean;
  highlightedMarkerID?: number;
  highlighted?: boolean;
  generalFilters?: IGFilters;
}

export const initialGeneralState: IGeneralState = {
  showingBusinesses: true,
  highlightedMarkerID: null,
  highlighted: false,
  generalFilters: {
    latlondis: [10, 10, 100000],
    query: ""
  }
};
