import { IGFilters } from "src/app/models/general_filters";

// keep zoom=12 in production. Center location of Munich.
export let defaultLatlonDis = [48.1548894, 11.4716248, 10000];
let defaultCity = "München";

export interface IGeneralState {
  showingBusinesses?: boolean;
  highlightedMarkerID?: number;
  highlighted?: boolean;
  generalFilters?: IGFilters;
  defaultGeneralFilter: IGFilters;
  closeDetailDrawer: boolean;
  isloading: boolean;
}

export const initialGeneralState: IGeneralState = {
  showingBusinesses: true,
  highlightedMarkerID: null,
  highlighted: false,
  isloading: false,
  generalFilters: {
    latlondis: defaultLatlonDis,
    query: "",
    city: defaultCity
  },
  defaultGeneralFilter: {
    latlondis: defaultLatlonDis,
    query: "",
    city: defaultCity
  },
  closeDetailDrawer: false
};
