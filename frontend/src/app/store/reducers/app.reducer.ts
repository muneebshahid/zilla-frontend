import { ActionReducerMap } from "@ngrx/store";

import { routerReducer } from "@ngrx/router-store";
import { IAppState } from "../state/app.state";
import { productReducers } from "./product";

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  products: productReducers
};
