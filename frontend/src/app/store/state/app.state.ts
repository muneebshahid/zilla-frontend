import { RouterReducerState } from "@ngrx/router-store";

import { initialProductState } from "./product";
import { IProduct } from "../../models/product";

export interface IAppState {
  router?: RouterReducerState;
  products: IProduct;
}

export const initialAppState: IAppState = {
  products: initialProductState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
