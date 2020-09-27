import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store'; 
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';

//import { ContactReducer } from './contacts/contact.reducer';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { ContactComponent } from './components/contact/contact.component';
import { ApiModule } from './helpers/api.module'
import { ContactsService } from './services/contacts.service';

import { contactsReducer } from './store/app.store';
import { AppEffects } from './effects/app.effects';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    AddContactComponent,
    EditContactComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ApiModule.forRoot({ rootUrl: 'http://localhost:5000' }),
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    StoreModule.forRoot({ contacts : contactsReducer }),
    EffectsModule.forRoot([AppEffects]),
//    RouterModule.forRoot(routes),
  ],
  providers: [AppEffects, ContactsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
