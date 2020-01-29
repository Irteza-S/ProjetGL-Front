import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs-compat/operator/map';
import { HttpHeaders } from '@angular/common/http';


const API_URL = 'localhost:8080/genielog/ticket/';

@Injectable({
  providedIn: 'root'
})

export class TicketAPIService {

  constructor(private http: Http) { }

  public initTicket(clientID, ticketID): any {
    return this.http
      .post(API_URL + '/init', {clientIde: clientID, idProject: ticketID})
      .map(response => {
        const data =  response.json();
        return {
          firstVariable: data
        };
      })
      .catch(this.handleError);
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
    return this.http.get('/api/client/try').map(res => res.json());
  }

  public okok() {
      const ok =  this.http.get('https://jsonplaceholder.typicode.com/posts/');
      ok.subscribe((data) => {
        console.log(data.json());
      });
      return ok;
  }

  public okok2() {
    const ok =  this.http.get('localhost:8080/genielog/ticket/init');
    ok.subscribe((data) => {
      console.log(data.json());
    });
    return ok;
}
}

