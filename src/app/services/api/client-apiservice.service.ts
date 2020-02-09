import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';

import { timeout } from 'rxjs/operators';
const API_URL = 'http://127.0.0.1:8080/genielog/client';
@Injectable({
  providedIn: 'root'
})
export class ClientAPIService {

  constructor(private http: Http) { }

  getCLientId(CLIENTNAME) {
    console.log('GettingClientID : ' + CLIENTNAME);
    const data = {
      clientName: CLIENTNAME
    };
    return this.http.post(API_URL + '/getId', JSON.stringify(data), '')
    .pipe(timeout(10000))
    .map(resp => {
      return resp;
    });
  }
}
