import { BusinessActions, EBusinessActions, UpdateBusinessFilters } from "../actions/business";
import { IBusinessState, initialBusinessState } from "../state/business";

export const businessReducers = (
  state = initialBusinessState,
  action: BusinessActions
): IBusinessState => {
  switch (action.type) {
    case EBusinessActions.GetSearchBusinessSuccess: {
      return {
        ...state,
        businesses: action.payload.businesses.businesses,
        num_hits: action.payload.businesses.num_hits,
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
};
