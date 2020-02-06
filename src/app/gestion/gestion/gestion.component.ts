import { Component, OnInit } from '@angular/core';
import { MatButtonModule} from '@angular/material';
import {NgModule} from '@angular/core';
import { Router } from '@angular/router';
import { LoginAPIService } from 'src/app/services/login/login-api.service';
import { UserType } from 'src/app/model/userole';

const MaterialComponents = [
  MatButtonModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})


@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styles: []
})
export class GestionComponent implements OnInit {
  features;


  constructor(private router: Router, private loginAIPI: LoginAPIService) { }

  ngOnInit() {
    const currentUser = this.loginAIPI.isUserLoggedIn();
    if (currentUser.role === UserType.Admin) {
      console.log('admin');
      this.features = [
      {
        title : 'Clients',
        description : ['Gérer les clients'],
        icon: 'assets/img/client.ico',
        url: '/list-client',
        parameters: ''
      },
      {
        title : 'Personnels',
        description : ['Gérer les employés'],
        icon: 'assets/img/personel.ico',
        url: '/list-staff',
        parameters: ''
      },
      {
        title : 'Compte',
        description : ['Gérer le compte'],
        icon: 'assets/img/admin.ico',
        url: '/form-staff',
        parameters: currentUser.id
      }
    ];
    } else {
      console.log('not admin');
      this.features = [{
        title : 'Compte',
        description : ['Gérer le compte'],
        icon: 'assets/img/admin.ico',
        url: '/form-staff',
        parameters: currentUser.id
      }
      ];
    }
  }

}
