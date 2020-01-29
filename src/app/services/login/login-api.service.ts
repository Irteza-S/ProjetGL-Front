import { Injectable } from '@angular/core';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginAPIService {
  constructor() { }

  // Insert REST request to server
  // Save user info in session
  authenticate(username, password) {
    if (username === 'admin' && password === 'admin') {
      sessionStorage.setItem('token', 'token123');
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('token');
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('token');
  }

  isUserAdmin() {
  }
}
