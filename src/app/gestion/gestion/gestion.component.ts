import { Component, OnInit } from '@angular/core';
import { MatButtonModule} from '@angular/material';
import {NgModule} from '@angular/core';
import { Router } from '@angular/router';

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


  constructor(private router: Router) { }

  ngOnInit() {
    this.features = [
      {
        title : 'Clients',
        description : ['Gérer les clients'],
        icon: 'assets/img/client.ico'
      },

      {
        title : 'Personnels',
        description : ['Gérer les employés'],
        icon: 'assets/img/personel.ico'

      },

      {
        title : 'Administrateur',
        description : ['Gérer le compte administrateur'],
        icon: 'assets/img/admin.ico'
      }
    ];
  }

}
