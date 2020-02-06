import { Injectable } from '@angular/core';
import { User, Gender } from '../../model/user';
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
      const admin = new User(1, Gender.Male, 'Irteza', 'SHEIKH', UserType.Admin, 'dqlofgpdxcv');
      sessionStorage.setItem('userSession', JSON.stringify(admin));
      return true;
    } else if (username === 'tech' && password === 'tech') {
      // Create user userSession
      const tech = new User(1, Gender.Male, 'Irteza', 'SHEIKH', UserType.Technicien, 'dllosqmcnsd');
      sessionStorage.setItem('userSession', JSON.stringify(tech));
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn(): User {
    const userString = sessionStorage.getItem('userSession');
    if (userString != null) {
      const user = JSON.parse(userString);
      return user;
    }
    return null;
  }

  isUserAdmin(): User {
    const userString = sessionStorage.getItem('userSession');
    if (userString) {
      const user = JSON.parse(userString);
      if (user.role === UserType.Admin) {
        console.log(user);
        return user;
      } else {
        console.log('failed admin');
        return null;
      }
    }
  }

  isUserResponsable(): User {
    const userString = sessionStorage.getItem('userSession');
    if (userString) {
      const user = JSON.parse(userString);
      if (user.role === UserType.Responsable) {
        return user;
      } else {
        return null;
      }
    }
  }

  isUserTechnicien(): User {
    const userString = sessionStorage.getItem('userSession');
    if (userString) {
      const user = JSON.parse(userString);
      if (user.role === UserType.Technicien) {
        return user;
      } else {
        return null;
      }
    }
  }

  logOut() {
    sessionStorage.removeItem('userSession');
  }
}
