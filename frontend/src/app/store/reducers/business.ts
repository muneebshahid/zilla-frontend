import { BusinessActions, EBusinessActions } from "../actions/business";
import { IBusinessState, initialBusinessState } from "../state/business";

export const businessReducers = (
  state = initialBusinessState,
  action: BusinessActions
): IBusinessState => {
  switch (action.type) {
    case EBusinessActions.GetExploreBusinessSuccess: {
      return {
        ...state,
        businesses: action.payload
      };
    }

    default:
      return state;
  }
};
