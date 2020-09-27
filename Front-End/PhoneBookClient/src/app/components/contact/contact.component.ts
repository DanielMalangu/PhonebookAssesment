import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ViewChild} from '@angular/core';
import { MatSort} from '@angular/material/sort';
import {Contact} from '../../models/contact';
import {select, Store} from '@ngrx/store';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { AppState, getAllContacts, getAllContactsLoaded, LoadContacts, LoadContactsRequested } from '../../store/app.store';
import { ContactsService } from '../../services/contacts.service';
import { dispatch } from 'rxjs/internal/observable/pairs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent implements OnInit {

  displayedColumns: string[] = ['name', 'surname', 'number', 'email', 'edit', 'delete'];
  public contacts: Observable<Contact[]>;
  dataSource: MatTableDataSource<Contact>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {}) sort: MatSort;

  constructor(private store: Store<AppState>, private contactService: ContactsService) {
    debugger;
    this.contacts = this.store.select(getAllContacts);
    this.contacts.subscribe(list => {debugger; this.loadTable(list)});
  }

  loadTable(contactList) {
    this.dataSource = new MatTableDataSource(contactList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
  }
  
  ngOnInit(): void {

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  deleteContact(currContact){
    debugger;
    this.contactService.deleteApiContactsDeleteId(currContact.id)
                        .subscribe(list => {
                          debugger;
                          this.store.dispatch(new LoadContactsRequested());
                          this.contacts = this.store.select(getAllContacts);
                          this.contacts.subscribe(list => {debugger; this.loadTable(list)});
                        });
    ;
  }

}
