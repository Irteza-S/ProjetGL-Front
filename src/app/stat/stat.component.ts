import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { StatAPIService } from '../services/api/stat-api.service';
import { LoginAPIService } from '../services/login/login-api.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StatComponent implements OnInit {
  user;

  // Data pour le temps technicien
  STAT_TEMPSTECHNICIEN = {
    barChartLabels: ['Technicien 1', 'Technicien 2', 'Technicien 3', 'Technicien 4', 'Technicien 5', 'Technicien 6', 'Technicien 7'],
    barChartType: 'bar',
    barChartLegend: true,
    barChartData: [
      {data: [0, 59, 80, 81, 56, 55, 40], label: 'Compétence A (h)'},
      {data: [42, 48, 40, 0, 86, 27, 45], label: 'Compétence B (h)'},
      {data: [28, 32, 25, 19, 0, 45, 10], label: 'Compétence C (h)'},
      {data: [12, 0, 10, 19, 86, 12, 20], label: 'Compétence D (h)'},
    ],
    barChartOptions: {
      scalesShowVerticalLines: false,
      responsive: true
    },
    dataStatus: 'Sample Data : API Error'
  };

  // Data pour le nb tickets par client
  STAT_TICKETPARCLIENT = {
    doughnutChartLabels: ['Client 1', 'Client 2', 'Client 3', 'Client 4', 'Client 5',
    'Client 6', 'Client 7', 'Client 8', 'Client 9','Client 10'],
    doughnutChartData: [52, 150, 60, 10, 52, 32, 64, 52, 21, 100],
    doughnutChartType: 'doughnut',
    dataStatus: 'Sample Data : API Error'
  }

  // Data pour ticket par categorie
  STAT_TICKETPARCATEGORIE = {
    radarChartLabels: ['Tickets ouverts', 'Tickets en cours', 'Tickets fermés', 'Tickets en attente', 'OKOK'],
    radarChartData: [
      {data: [120, 150, 78, 90, 99], label: '2018'},
      {data: [90, 140, 50, 100, 99], label: '2019'}
    ],
    radarChartType: 'radar',
    dataStatus: 'Sample Data : API Error'
  }

  STAT_TICKETPARCOMPETENCE = {
    pieChartLabels: ['Frigoriste','Plombier','Electricien','Carreleur'],
    pieChartData: [120, 150, 180, 90],
    pieChartType: 'pie',
    dataStatus: 'Sample Data : API Error'
  }



  constructor(private StatAPI: StatAPIService, private loginAPI: LoginAPIService, private spinnerService: Ng4LoadingSpinnerService) {
    this.user = loginAPI.isUserLoggedIn();
    if (this.user != null) {
      this.spinnerService.show();
      this.StatAPI.getStatTicketParCLient().subscribe(
        value => {
          this.initStatTicketParClient(value);
        },
          error => {console.log('ERROR', error);
        }
      ).add(() => {
        this.StatAPI.getStatTicketParCategorie().subscribe(
          value => {
            this.initStatTicketParCategorie(value);
          },
            error => {console.log('ERROR', error);
          }
        ).add(() => {
          this.StatAPI.getStatTicketParCompetence().subscribe(
            value => {
              this.initStatTicketParCompetence(value);
            },
              error => {console.log('ERROR', error);
            }
          ).add(() => {
            this.StatAPI.getStatTempsParCompetence().subscribe(
              value => {
                this.initStatTempsParCompetence(value);
              },
                error => {console.log('ERROR', error);
              }
          ).add(() => {
            this.spinnerService.hide();
          })
        });
        });
      });;
    }
  }

  ngOnInit(){

  }

  initStatTempsParCompetence(data) {
    const resSTR = JSON.parse(JSON.stringify(data));
    const body = JSON.parse(resSTR._body);
    this.STAT_TEMPSTECHNICIEN.barChartData = body.radarChartData;
    this.STAT_TEMPSTECHNICIEN.barChartLabels = body.radarChartLabels;
    this.STAT_TEMPSTECHNICIEN.dataStatus = '';
  }

  initStatTicketParCompetence(data) {
    const resSTR = JSON.parse(JSON.stringify(data));
    const body = JSON.parse(resSTR._body);
    this.STAT_TICKETPARCOMPETENCE.pieChartData = body.doughnutChartData;
    this.STAT_TICKETPARCOMPETENCE.pieChartLabels = body.doughnutChartLabels;
    this.STAT_TICKETPARCOMPETENCE.dataStatus = '';
  }

  initStatTicketParClient(data) {
    const resSTR = JSON.parse(JSON.stringify(data));
    const body = JSON.parse(resSTR._body);
    this.STAT_TICKETPARCLIENT.doughnutChartData = body.doughnutChartData;
    this.STAT_TICKETPARCLIENT.doughnutChartLabels = body.doughnutChartLabels;
    this.STAT_TICKETPARCLIENT.dataStatus = '';
  }

  initStatTicketParCategorie(data) {
    const resSTR = JSON.parse(JSON.stringify(data));
    const body = JSON.parse(resSTR._body);
    this.STAT_TICKETPARCATEGORIE.radarChartData = body.radarChartData;
    this.STAT_TICKETPARCATEGORIE.radarChartLabels = body.radarChartLabels;
    this.STAT_TICKETPARCATEGORIE.dataStatus = '';
  }

}
