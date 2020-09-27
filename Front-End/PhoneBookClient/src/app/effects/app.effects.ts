import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { LoadContactsRequested, ActionTypes, LoadContacts, AppState, getAllContactsLoaded} from '../store/app.store';
import { withLatestFrom, exhaustMap, filter, map } from 'rxjs/operators';
import { ContactsService } from '../services/contacts.service';

@Injectable()
export class AppEffects {
  @Effect()
  loadContactsRequested$ = this.actions$.pipe(
    ofType<LoadContactsRequested>(ActionTypes.LoadContactsRequested),
    withLatestFrom(this.store.select(getAllContactsLoaded)),
    filter(([_, loaded]) => !loaded),
    exhaustMap(() => this.contactsService.getApiContactsAllContacts().pipe(
      map(result => new LoadContacts(result))
    ))
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private contactsService: ContactsService
  ) {}
}

