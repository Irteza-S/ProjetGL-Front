import { Component, OnInit } from '@angular/core';
export interface Ticket {
  ticketId: number;
  client: string;
  demandeur: string;
  updated: Date;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent implements OnInit {
  tickets: Ticket[] = [
    {
      ticketId: 1,
      client: 'Carefour',
      demandeur: 'CarefourDemandeur1',
      updated: new Date('1/1/16'),
    },
    {
      ticketId: 2,
      client: 'Auchan',
      demandeur: 'AuchantDemandeur3',
      updated: new Date('1/17/16'),
    },
    {
      ticketId: 3,
      client: 'Fnac',
      demandeur: 'FnacDemandeur9',
      updated: new Date('1/28/16'),
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
