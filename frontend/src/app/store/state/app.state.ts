import { RouterReducerState } from "@ngrx/router-store";

import { initialProductState } from "./product";
import { IProductState } from "./product";
import { IBusinessState, initialBusinessState } from "./business";

export interface IAppState {
  router?: RouterReducerState;
  products: IProductState;
  businesses: IBusinessState;
}

export const initialAppState: IAppState = {
  products: initialProductState,
  businesses: initialBusinessState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
