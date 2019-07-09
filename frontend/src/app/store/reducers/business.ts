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
    case EBusinessActions.GetSearchBusinessSuccess: {
      return {
        ...state,
        businesses: action.payload.businesses,
        num_hits: action.payload.num_hits
      };
    }
    case EBusinessActions.GetBusinessDetailSuccess: {
      return {
        ...state,
        business: action.payload
      };
    }

    default:
      return state;
  }
};
