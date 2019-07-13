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

    default:
      return state;
  }
};
