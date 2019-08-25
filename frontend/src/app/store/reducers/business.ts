import { BusinessActions, EBusinessActions } from "../actions/business";
import { IBusinessState, initialBusinessState } from "../state/business";

export function businessReducers(
  state = initialBusinessState,
  action: BusinessActions
): IBusinessState {
  switch (action.type) {
    case EBusinessActions.GetSearchBusinessSuccess: {
      return {
        ...state,
        businesses: action.payload.businesses,
        num_hits: action.payload.num_hits,
        markers: action.payload.markers
      };
    }
    case EBusinessActions.GetBusinessDetailSuccess: {
      return {
        ...state,
        business: action.payload
      };
    }
    case EBusinessActions.UpdateBusinessFilters: {
      return {
        ...state,
        filters: action.payload
      };
    }
    case EBusinessActions.GetBusinessAmenitiesSuccess: {
      return {
        ...state,
        businessAmenities: action.payload
      };
    }
    case EBusinessActions.GetBusinessTypesSuccess: {
      return {
        ...state,
        businessTypes: action.payload
      };
    }

    default:
      return state;
  }
}
