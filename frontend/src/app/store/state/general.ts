import { IGFilters } from "src/app/models/general_filters";

let defaultLatlonDis = [1, 1, 100000];

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
