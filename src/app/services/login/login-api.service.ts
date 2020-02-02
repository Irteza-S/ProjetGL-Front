import { Injectable } from '@angular/core';
import { User } from '../../model/user';
import { UserType } from 'src/app/model/userole';

@Injectable({
  providedIn: 'root'
})
export class LoginAPIService {
  constructor() { }

  // Insert REST request to server
  // Save user info in session
  authenticate(username, password) {
    if (username === 'admin' && password === 'admin') {
      // Create admin userSession
      const admin = new User(1, 'adminFirst', 'adminLast', UserType.Admin, 'dqlofgpdxcv');
      sessionStorage.setItem('userSession', JSON.stringify(admin));
      return true;
    } else if (username === 'tech' && password === 'tech') {
      // Create user userSession
      const tech = new User(1, 'techFirst', 'techLast', UserType.Technicien, 'dllosqmcnsd');
      sessionStorage.setItem('userSession', JSON.stringify(tech));
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('userSession');
    console.log(!(user === null));
    return !(user === null);
  }

  isUserAdmin(): any {
    const userString = sessionStorage.getItem('userSession');
    const user = JSON.parse(userString);
    if (user.role === UserType.Admin) {
      return user;
    } else {
      return false;
    }
  }

  isUserResponsable(): any {
    const userString = sessionStorage.getItem('userSession');
    const user = JSON.parse(userString);
    if (user.role === UserType.Responsable) {
      return user;
    } else {
      return false;
    }
  }

  isUserTechnicien(): any {
    const userString = sessionStorage.getItem('userSession');
    const user = JSON.parse(userString);
    if (user.role === UserType.Technicien) {
      return user;
    } else {
      return false;
    }
  }

  logOut() {
    sessionStorage.removeItem('token');
  }
}
