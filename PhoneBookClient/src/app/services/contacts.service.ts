/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../helpers/base-service';
import { ApiConfiguration as __Configuration } from '../helpers/api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../helpers/strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Contact } from '../models/contact';
@Injectable({
  providedIn: 'root',
})
class ContactsService extends __BaseService {
  static readonly getApiContactsAllContactsPath = '/api/Contacts/AllContacts';
  static readonly getApiContactsIdPath = '/api/Contacts/{id}';
  static readonly postApiContactsPath = '/api/Contacts';
  static readonly putApiContactsPath = '/api/Contacts';
  static readonly deleteApiContactsDeleteIdPath = '/api/Contacts/delete/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  getApiContactsAllContactsResponse(): __Observable<__StrictHttpResponse<Array<Contact>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Contacts/AllContacts`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Contact>>;
      })
    );
  }
  /**
   * @return Success
   */
  getApiContactsAllContacts(): __Observable<Array<Contact>> {
    return this.getApiContactsAllContactsResponse().pipe(
      __map(_r => _r.body as Array<Contact>)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  getApiContactsIdResponse(id: string): __Observable<__StrictHttpResponse<Contact>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Contacts/${encodeURIComponent(id)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Contact>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  getApiContactsId(id: string): __Observable<Contact> {
    return this.getApiContactsIdResponse(id).pipe(
      __map(_r => _r.body as Contact)
    );
  }

  /**
   * @param body undefined
   * @return Success
   */
  postApiContactsResponse(body?: Contact): __Observable<__StrictHttpResponse<Contact>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Contacts`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Contact>;
      })
    );
  }
  /**
   * @param body undefined
   * @return Success
   */
  postApiContacts(body?: Contact): __Observable<Contact> {
    return this.postApiContactsResponse(body).pipe(
      __map(_r => _r.body as Contact)
    );
  }

  /**
   * @param body undefined
   * @return Success
   */
  putApiContactsResponse(body?: Contact): __Observable<__StrictHttpResponse<Contact>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/Contacts`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Contact>;
      })
    );
  }
  /**
   * @param body undefined
   * @return Success
   */
  putApiContacts(body?: Contact): __Observable<Contact> {
    return this.putApiContactsResponse(body).pipe(
      __map(_r => _r.body as Contact)
    );
  }

  /**
   * @param id undefined
   */
  deleteApiContactsDeleteIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/Contacts/delete/${encodeURIComponent(id)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id undefined
   */
  deleteApiContactsDeleteId(id: string): __Observable<null> {
    return this.deleteApiContactsDeleteIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ContactsService {
}

export { ContactsService }
