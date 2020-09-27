import { Component, Input, OnInit } from '@angular/core';
import {Contact} from '../../models/contact';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import { AppState, getAllContacts, LoadContactsRequested } from '../../store/app.store';
import {NgForm} from '@angular/forms';
import { ContactsService } from '../../services/contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.less']
})
export class EditContactComponent implements OnInit {

  contact: Contact;
  constructor(private store: Store<AppState>, private contactService: ContactsService, private router :Router) { 
    debugger;
    if(history.state.contact)
      this.contact = JSON.parse(history.state.contact);
    else
      this.router.navigate([""]);
  } 
  
  public UpdateContact() { 
    debugger;
    this.contactService.putApiContacts(this.contact).subscribe(c => {this.store.dispatch(new LoadContactsRequested()); this.router.navigate(["../../contacts"])});
  }

  ngOnInit(): void {
  }


  cancel(){
    
  }
}
