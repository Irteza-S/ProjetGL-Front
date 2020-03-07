import { Component, OnInit } from '@angular/core';

export interface Ticket {
  ticketId: number;
  clientName: string;
  demandeur: string;
  ticketDate: Date;
}
export interface Client {
  clientId: number;
  clientName: string;
}
export interface Demandeur {
  demandeurId: number;
  demandeurName: string;
  demandeurClient: string;
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
      clientName: 'Carefour',
      demandeur: 'CarefourDemandeur1',
      ticketDate: new Date('1/1/16'),
    },
    {
      ticketId: 2,
      clientName: 'Auchan',
      demandeur: 'AuchantDemandeur3',
      ticketDate: new Date('1/17/16'),
    },
    {
      ticketId: 3,
      clientName: 'Fnac',
      demandeur: 'FnacDemandeur9',
      ticketDate: new Date('1/28/16'),
    },
    {
      ticketId: 1,
      clientName: 'Carefour',
      demandeur: 'CarefourDemandeur1',
      ticketDate: new Date('1/1/16'),
    },
    {
      ticketId: 2,
      clientName: 'Auchan',
      demandeur: 'AuchantDemandeur3',
      ticketDate: new Date('1/17/16'),
    },
    {
      ticketId: 3,
      clientName: 'Fnac',
      demandeur: 'FnacDemandeur9',
      ticketDate: new Date('1/28/16'),
    }
  ];

  clients: Client[] = [
    {
      clientId: 1,
      clientName: 'Carefour'
    },
    {
      clientId: 2,
      clientName: 'Auchan'
    },
    {
      clientId: 3,
      clientName: 'Fnac'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
