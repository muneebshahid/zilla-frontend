import { RouterReducerState } from "@ngrx/router-store";

import { initialProductState } from "./product";
import { IProductState } from "./product";

export interface IAppState {
  router?: RouterReducerState;
  products: IProductState;
}

export const initialAppState: IAppState = {
  products: initialProductState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
