import { GeneralActions, EGeneralActions } from "../actions/general";
import { initialGeneralState, IGeneralState } from "../state/general";

export const generalReducers = (
  state = initialGeneralState,
  action: GeneralActions
): IGeneralState => {
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

    default:
      return state;
  }
};
