import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import { fbind } from 'q';
import { TicketAPIService } from '../../services/api/ticket-api.service';
import { TicketFormType } from '../../model/ticketformtype';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent implements OnInit {
  ticketFormType: TicketFormType;
  ticketFormGroup: FormGroup;
  demandeTypeList = ['Incident', 'Demande'];
  technicienList = ['Technicien1', 'Technicien2', 'Technicien3'];
  demandeurList = ['Demandeur1', 'Demandeur2', 'Demandeur3'];
  clientSiteList = ['Site1', 'Site2', 'Site3'];
  categorieList = ['Categorie1', 'Categorie2', 'Categorie3'];
  tacheList = [];
  prioriteList = ['1', '2', '3'];
  statusList = ['Non résolu', 'Résolu', 'Ouvert', 'En cours', 'Bloqué'];
  competenceList = ['Frigoriste', 'Plombier', 'Serrurier'];

  openingDate = new FormControl(new Date());
  inputDate = new FormControl(new Date());
  startingDate = new FormControl(new Date());

  constructor(private fb: FormBuilder, private ticketApi: TicketAPIService) {
    this.initForm(fb);
    // this.ticketFormType = formType;
   }

  ngOnInit() {
  }

  initForm(fb: FormBuilder) {
    this.ticketFormGroup = fb.group({
      form_objet: fb.control('', Validators.required),
      form_type: fb.control('', Validators.required),
      form_description: fb.control('', Validators.required),
      form_technicien: fb.control('', Validators.required),
      form_demandeur: fb.control('', Validators.required),
      form_site: fb.control('', Validators.required),
      form_categorie: fb.control('', Validators.required),
      form_priorite: fb.control('', Validators.required),
      form_status: fb.control('', Validators.required),
      form_tache: this.fb.array([this.fb.group({
        tacheName: '',
        tacheLength: '',
        tacheCompetence: ''
      })])
    });
  }

  addTacheGroup(): FormGroup {
    return this.fb.group({
      tacheName: ['', Validators.required],
      tacheLength: ['', Validators.required],
      tacheCompetence: ['', Validators.required]
    });
  }

  get form_tache() {
    return this.ticketFormGroup.get('form_tache') as FormArray;
  }

  addTache() {
    this.form_tache.push(this.fb.group({
      tacheName: '',
      tacheLength: '',
      tacheCompetence: ''
    }));
  }

  deleteTache(index) {
    this.form_tache.removeAt(index);
  }

  sendForm() {
    // console.log(this.ticketFormGroup);
    //console.log(this.ticketApi.test2());
    this.ticketApi.okok();
    //this.ticketApi.okok2();
    // console.log(this.ticketApi.initTicket(123456789, 2));
  }
}
