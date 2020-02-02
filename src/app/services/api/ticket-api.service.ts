import { Injectable } from '@angular/core';

import { Http, Response} from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs-compat/operator/map';
import { HttpHeaders } from '@angular/common/http';

const postData = {
  test: 'OKTAM',
};
let url = 'http://httpbin.org/post';
let json;

const API_URL = 'http://127.0.0.1:4200/genielog/ticket';

@Injectable({
  providedIn: 'root'
})

export class TicketAPIService {

  constructor(private http: Http) { }

  public initTicket(clientID, ticketID): any {
    return this.http
      .post('http://127.0.0.1:4200/genielog/ticket/init', {clientIde: clientID, idProject: ticketID})
      .catch(this.handleError)
      .subscribe((data) => {
        console.log(data);
      });
  }

  // Error handling
  handleError(handleError: any): any {
    console.log('ERROR');
    throw new Error('Method not implemented.');
  }

  public test(): any {
    this.http.post('/api/client/try', '').toPromise().then((data: any) => {
      console.log(data);
      console.log(data.json.test);
      const res = JSON.stringify(data.json);
      return res;
    });
  }

  public test2(): any {
    const ok =  this.http.get('http://127.0.0.1:4200/genielog/ticket/test');
    ok.subscribe((data) => {
      console.log(data);
    });
    return ok;
  }

  public okok() {
    const ok =  this.http.post('http://httpbin.org/post', postData);
    ok.subscribe((data) => {
      json = JSON.stringify(data);
      console.log('1');
      console.log(json);
    });
  }

  public okok2() {
    const ok =  this.http.get('http://127.0.0.1:4200/genielog/ticket/test');
    ok.subscribe((data) => {
      console.log(data);
    });
    return ok;
  }
}

