import { ProductActions, EProductActions } from "../actions/product";
import { initialProductState } from "../state/product";
import { IProductState } from "../state/product";

export const productReducers = (
  state = initialProductState,
  action: ProductActions
): IProductState => {
  switch (action.type) {
    case EProductActions.GetSearchProductsSuccess: {
      return {
        ...state,
        products: action.payload.products,
        num_hits: action.payload.num_hits
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
