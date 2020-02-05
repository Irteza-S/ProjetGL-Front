import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gestion-card',
  templateUrl: './gestion-card.component.html',
  styleUrls: ['./gestion-card.component.css']
})
export class GestionCardComponent {

  constructor() { }

  // Les trois propriétés qui diffèrent sur les grandes categories
  @Input() description: string;
  @Input() icon: string;
  @Input() title: string;


  imageClick(tmp) {
  console.log(tmp);
}

}
