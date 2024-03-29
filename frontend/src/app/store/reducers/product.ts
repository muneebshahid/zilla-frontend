import { ProductActions, EProductActions } from "../actions/product";
import { initialProductState } from "../state/product";
import { IProductState } from "../state/product";

export function productReducers(
  state = initialProductState,
  action: ProductActions
): IProductState {
  switch (action.type) {
    case EProductActions.GetSearchProductsSuccess: {
      return {
        ...state,
        products: action.payload.products,
        num_hits: action.payload.num_hits,
        markers: action.payload.markers
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
    case EProductActions.GetProductTagsSuccess: {
      return {
        ...state,
        product_tags: action.payload
      };
    }
    case EProductActions.UpdateProductFilters: {
      return {
        ...state,
        filters: action.payload
      };
    }
    case EProductActions.GetProductTypesSuccess: {
      return {
        ...state,
        product_types: action.payload
      };
    }
    case EProductActions.UpdateProductDefaultFilters: {
      return {
        ...state,
        default_filters: action.payload
      };
    }

    default:
      return state;
  }
}
