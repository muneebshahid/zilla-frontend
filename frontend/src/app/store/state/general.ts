import { IGFilters } from "src/app/models/general_filters";

// keep zoom=12 in production. Center location of Munich.
let defaultLatlonDis = [48.1548894, 11.4716248, 100000];

export interface IGeneralState {
  showingBusinesses?: boolean;
  highlightedMarkerID?: number;
  highlighted?: boolean;
  generalFilters?: IGFilters;
  defaultLatlondis: Array<number>;
  closeDetailDrawer: boolean;
}

export const initialGeneralState: IGeneralState = {
  showingBusinesses: true,
  highlightedMarkerID: null,
  highlighted: false,
  generalFilters: {
    latlondis: defaultLatlonDis,
    query: ""
  },
  defaultLatlondis: defaultLatlonDis,
  closeDetailDrawer: false
};
