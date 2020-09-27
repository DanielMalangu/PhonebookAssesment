import { Action, createSelector, createFeatureSelector } from '@ngrx/store';
import { Contact } from '../models/contact';

export interface AppState {
  contacts: ContactState;
}

export interface ContactState {
    allContactsLoaded: boolean;
    data: Contact[] | null;
}

const intialState = {
    allContactsLoaded: false,
    data: null
}

export enum ActionTypes {
  LoadContactsRequested = '[Contacts API] Load Contacts Requested',
  LoadContacts = '[Contacts API] Load Contacts'
}

export class LoadContactsRequested implements Action {
  readonly type = ActionTypes.LoadContactsRequested;
};

export class LoadContacts implements Action {
  readonly type = ActionTypes.LoadContacts;
  constructor(public payload: Contact[]) {}
}

export type ContactActions = LoadContactsRequested | LoadContacts;

export function contactsReducer(state = intialState, action) {
  switch(action.type) {
      case ActionTypes.LoadContacts:
      return {
        allContactsLoaded: true,
        data: action.payload
      };
    default:
      return state;
  }
}

const getContacts = createFeatureSelector<AppState, ContactState>('contacts');

export const getAllContacts = createSelector(getContacts, state => state.data);
export const getAllContactsLoaded = createSelector(getContacts, state => state.allContactsLoaded);
