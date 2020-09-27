import { Component, OnInit } from '@angular/core';
import {Contact} from '../../models/contact';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import { AppState, getAllContacts, LoadContactsRequested } from '../../store/app.store';
import { ContactsService } from '../../services/contacts.service';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.less']
})
export class AddContactComponent implements OnInit {

  public contact: Contact; 
  constructor(private store: Store<AppState>, private contactService: ContactsService, private router :Router) { 

  } 
  
  public AddContact() { 
    debugger;
    this.contactService.postApiContacts(this.contact)
                        .subscribe(c => 
                          {
                            debugger; 
                            this.store.dispatch(new LoadContactsRequested()); 
                            this.router.navigate(["../../contacts"]);
                          });
  }

  ngOnInit(): void {
    this.contact = <Contact>{};
  }

  cancel(){
    
  }
}
