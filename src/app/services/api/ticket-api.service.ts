import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs-compat/operator/map';
import { HttpHeaders } from '@angular/common/http';

const API_URL = 'http://127.0.0.1:4200/genielog/ticket';

@Injectable({
  providedIn: 'root'
})

export class TicketAPIService {

  constructor(private http: Http) { }

  // POST REQUEST TO INIT TICKET PAGE
  initTicket(CLIENTID, TICKETID) {
    const postData = {
      clientId: CLIENTID,
      TicketId: TICKETID
    };
    this.http
      .post(API_URL + 'init', postData)
      .catch(this.handleError)
      .subscribe((data) => {
        console.log(data);
    });
  }

  // Error handling
  handleError(handleError: any): any {
    console.log('Error API');
    throw new Error('Error API');
  }

  public test2(): any {
    const ok =  this.http.get('http://127.0.0.1:4200/genielog/ticket/test');
    ok.subscribe((data) => {
      console.log(data);
    });
    return ok;
  }

  /*
  login(US: string, PASS: string) {
    const data = {username: US, password: PASS};
    const header = new Headers({ 'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT'});
    const options = new RequestOptions({ headers: header });
    this.http.post('http://127.0.0.1:8080/genielog/ticket/test', JSON.stringify(data), options)
        .subscribe(res => {
            console.log(res);
        }, error => {
            console.log(JSON.stringify(error.json()));
        });
  }*/

}

