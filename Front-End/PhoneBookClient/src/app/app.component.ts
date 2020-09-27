import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, LoadContactsRequested } from './store/app.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'PhoneBookClient';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadContactsRequested());
  }
}


