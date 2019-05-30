import { ProductActions, EProductActions } from "../actions/product";
import { initialProductState } from "../state/product";
import { IProduct } from "../../models/product";

export const productReducers = (state = initialProductState, action: ProductActions): IProduct => {
  switch (action.type) {
    case EProductActions.GetProductDetails: {
      return {
        ...state,
        id: action.payload
      };
    }

    default:
      return state;
  }
};
