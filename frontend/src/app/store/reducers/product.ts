import { ProductActions, EProductActions } from "../actions/product";
import { initialProductState } from "../state/product";
import { IProductState } from "../state/product";

export const productReducers = (
  state = initialProductState,
  action: ProductActions
): IProductState => {
  switch (action.type) {
    case EProductActions.GetNearbyProductsSuccess: {
      return {
        ...state,
        products: action.payload
      };
    }
    case EProductActions.GetProductsOfBusinessSuccess: {
      return {
        ...state,
        products: action.payload
      };
    }
    case EProductActions.GetProductDetailsSuccess: {
      return {
        ...state,
        product: action.payload
      };
    }

    default:
      return state;
  }
};
