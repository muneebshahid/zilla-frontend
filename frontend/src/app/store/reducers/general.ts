import { GeneralActions, EGeneralActions } from "../actions/general";
import { initialGeneralState, IGeneralState } from "../state/general";

export function generalReducers(
  state = initialGeneralState,
  action: GeneralActions
): IGeneralState {
  switch (action.type) {
    case EGeneralActions.UpdateSearchType: {
      return {
        ...state,
        showingBusinesses: action.payload.showingBusinesses
      };
    }
    case EGeneralActions.HighlightMapMarker: {
      return {
        ...state,
        highlightedMarkerID: action.payload.highlightedMarkerID,
        highlighted: action.payload.highlighted
      };
    }
    case EGeneralActions.UpdateGeneralFilters: {
      return {
        ...state,
        generalFilters: action.payload
      };
    }
    case EGeneralActions.UpdateCloseDetailDrawer: {
      return {
        ...state,
        closeDetailDrawer: action.payload
      };
    }
    case EGeneralActions.UpdateDefaultLatLonDis: {
      return {
        ...state,
        defaultGeneralFilter: action.payload
      };
    }
    case EGeneralActions.UpdateIsLoading: {
      return {
        ...state,
        isloading: action.payload
      };
    }

    default:
      return state;
  }
}
