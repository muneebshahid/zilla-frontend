import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { IAppState } from '../state/app.state';
import {
  GetItemDetails
} from '../actions/item';

import { ItemService } from '../../services/item/item.service';
import { EItemActions } from '../actions/item';

// import { IUserHttp } from '../../models/http-models/user-http.interface';

import { selectItemID } from '../selectors/item';

@Injectable()
export class ItemEffects {

  @Effect()
  getItemDetail$ = this._actions$.pipe(
    ofType<GetItemDetails>(EItemActions.GetItemDetails),
    map((output) => {
        console.log(output);
    })
);

  constructor(
    private itemService: ItemService,
    private _actions$: Actions,
    private _store: Store<IAppState>
  ) {}
}