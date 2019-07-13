import { RouterReducerState } from "@ngrx/router-store";

import { initialProductState } from "./product";
import { IProductState } from "./product";
import { IBusinessState, initialBusinessState } from "./business";
import { IGeneralState, initialGeneralState } from "./general";

export interface IAppState {
  router?: RouterReducerState;
  products?: IProductState;
  businesses?: IBusinessState;
  general?: IGeneralState;
}

export const initialAppState: IAppState = {
  products: initialProductState,
  businesses: initialBusinessState,
  general: initialGeneralState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
