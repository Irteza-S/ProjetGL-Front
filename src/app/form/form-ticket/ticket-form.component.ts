import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import { fbind } from 'q';
import { TicketAPIService } from '../../services/api/ticket-api.service';
import { TicketFormType } from '../../model/ticketformtype';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Timer } from '../..//model/timer';
import { State } from '../../model/state';
import { tick } from '@angular/core/testing';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { LoginAPIService } from 'src/app/services/login/login-api.service';

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
  categorieList = [];
  tacheList = [];
  prioriteList = ['1', '2', '3'];
  statusList = ['Non résolu', 'Résolu', 'Ouvert', 'En cours', 'Bloqué'];
  competenceList = ['Frigoriste', 'Plombier', 'Serrurier'];
  clientId;
  ticketId;
  clientName;

  // Taches competences selection
  competencesDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Tout selectionner',
    unSelectAllText: 'Tout de-selectionner',
    allowSearchFilter: true
  };

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  // ProgressBar
  progressBarStatus = 'success';
  progressBarValue = 45;
  ticketJSON;
  animated = false;

  // Chrono
  private _btnPlay: string = 'Démarrer';
  private _timer: Timer = new Timer();
  private _state: State = new State();
  selectedTache = null;
  isSelected = false;
  disableChrono = false;

  saveSec(event) {
    this._timer.secondes = event.target.value;
    this.isSelected = true;
    this.disableChrono = true;
  }

  saveMin(event) {
    this._timer.minutes = event.target.value;
    this.isSelected = true;
    this.disableChrono = true;
  }

  saveHeure(event) {
    this._timer.heures = event.target.value;
    this.isSelected = true;
    setTimeout(function() { this.isSelected = false; console.log(this.isSelected); }, 1000);
    this.disableChrono = true;
  }

  play() {
    this._timer.start();
    this._state.setPlay();
    this._btnPlay = 'Continuer';
  }
  stop() {
      this._timer.stop();
      this._state.setStop();
  }
  backward() {
      this._timer.reset();
      this._state.setBackward();
      this._btnPlay = 'Démarrer';
  }
  saveChrono() {
    const min = this._timer.minutes as number;
    const hours = this._timer.heures as number;
    const x = +min + (+hours) * 60;
    console.log('total ' + x);
    this.form_tache.at(this.selectedTache).patchValue({
      tacheLength: x
    });
    this.isSelected = false;
  }


  constructor(private fb: FormBuilder, private ticketApi: TicketAPIService,
              private route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService,
              private modalService: NgbModal, private router: Router, private loginAPI: LoginAPIService) {
    this.initForm(fb);
    this.route.paramMap.subscribe(params => {
      this.ticketId = params.get('ticketId');
      this.clientId = params.get('clientId');
      this.clientName = +this.clientId;
      // Load Ticket
      if (this.ticketId) {
        this.ticketFormType = TicketFormType.Edit;
        this.spinnerService.show();
        this.ticketApi.loadTicket(this.clientId, +this.ticketId).subscribe(
        value => {
          this.initPage(value);
          this.spinnerService.hide(); },
          error => {console.log('ERROR', error); this.spinnerService.hide(); }
        );
      } else {
        // Initialize ticket from client informations
        this.ticketFormType = TicketFormType.Create;
        this.spinnerService.show();
        this.ticketApi.initNewTicket(this.clientId).subscribe(
        value => {
          this.initPage(value);
          this.spinnerService.hide(); },
          error => {console.log('ERROR', error); this.spinnerService.hide(); }
        );
      }
    });
   }

  ngOnInit() {
  }

  initForm(fb: FormBuilder) {
    this.ticketFormGroup = fb.group({
      form_objet: fb.control('', Validators.required),
      form_type: fb.control('', Validators.required),
      form_description: fb.control('', Validators.required),
      form_technicien: fb.control(''),
      form_demandeur: fb.control('', Validators.required),
      form_site: fb.control('', Validators.required),
      form_categorie: fb.control('', Validators.required),
      form_priorite: fb.control('', Validators.required),
      form_status: fb.control('', Validators.required),
      form_tache: this.fb.array([this.fb.group({
        tacheName: '',
        estimatedTacheLength: '',
        tacheLength: '',
        tacheCompetence: '',
        tacheDescription: '',
        tacheStatut: '',
        tacheId: '',
        technicien: ''
      })])
    });
  }

  initPage(data) {
    this.deleteTache(0);
    const resSTR = JSON.parse(JSON.stringify(data));
    const tmp = JSON.parse(resSTR._body);
    const body = JSON.parse(resSTR._body);
    console.log(tmp);
    this.categorieList = body.categorieList;
    this.demandeTypeList = body.demandeTypeList;
    this.competenceList = body.skillsList;
    this.statusList = body.statusList;

    // Techniciens
    body.technicienList.forEach((part, index) => {
      body.technicienList[index] = part.sexe + ' ' + part.id + ' ' + part.nom + ' ' + part.prenom;
    }, body.technicienList);
    this.technicienList = body.technicienList;

    // Demandeurs
    body.demandeurList.forEach((part, index) => {
      body.demandeurList[index] = part.sexe + ' ' + part.id + ' ' + part.nom + ' ' + part.prenom;
    }, body.demandeurList);
    this.demandeurList = body.demandeurList;
    console.log('ccaca');
    console.log(this.demandeurList.length);
    if (this.demandeurList.length === 0) {
      alert('Impossible de créer un ticket pour un client qui n\'a pas de demandeur, veuillez créer un demandeur');
      this.router.navigate(['/list-ticket']);
    }

    // ClientSite
    body.clientSiteList.forEach((part, index) => {
      body.clientSiteList[index] = part.adresse.numero + ' ' + part.adresse.rue + ' ' + part.adresse.codePostal + ' ' + part.adresse.ville;
    }, body.clientSiteList);
    this.clientSiteList = body.clientSiteList;
    const tmpUser = this.loginAPI.isUserTechnicien();
    // Si le ticket existe déjà
    if (body.ticket) {
      console.log('ticket existe');
      this.clientName = body.ticket.nomClient;
      const description = body.ticket.description;
      const objet = body.ticket.objet;
      let tech = body.ticket.technicien.sexe + ' ' + body.ticket.technicien.id + ' ' + body.ticket.technicien.nom + ' ' + body.ticket.technicien.prenom;
      const tmpUser = this.loginAPI.isUserTechnicien();
      if (tmpUser != null) {
        if(+body.ticket.technicien.id != null) {
          const tmp = tmpUser.gender + ' ' + tmpUser.id + ' ' + tmpUser.lastName + ' ' + tmpUser.firstName;
          this.technicienList = ['', tmp];
        } else if(+body.ticket.technicien.id != tmpUser.id) {
          this.ticketFormGroup.controls.form_technicien.disable();
        }
      }
      const demande = body.ticket.type;
      const demandeur = body.ticket.demandeur.sexe + ' ' + body.ticket.demandeur.id + ' ' + body.ticket.demandeur.nom + ' ' + body.ticket.demandeur.prenom;
      const adresse = body.ticket.adresse.numero + ' ' + body.ticket.adresse.rue + ' ' +
      body.ticket.adresse.codePostal + ' ' + body.ticket.adresse.ville;
      const categorie = body.ticket.categorie;
      const statut = body.ticket.statut;

      this.ticketFormGroup.controls.form_type.setValue(demande);
      this.ticketFormGroup.controls.form_technicien.setValue(tech);
      this.ticketFormGroup.controls.form_demandeur.setValue(demandeur);
      this.ticketFormGroup.controls.form_site.setValue(adresse);
      this.ticketFormGroup.controls.form_categorie.setValue(categorie);
      this.ticketFormGroup.controls.form_description.setValue(description);
      this.ticketFormGroup.controls.form_objet.setValue(objet);
      this.ticketFormGroup.controls.form_status.setValue(statut);

      // Ajout de taches existantes
      if (body.ticket.taches) {
          // Ajout des taches suivantes
          body.ticket.taches.forEach(tache => {
            console.log(tache);
            tech = tache.technicien.sexe + ' ' + tache.technicien.id + ' ' + tache.technicien.nom + ' ' + tache.technicien.prenom;
            (this.ticketFormGroup.get("form_tache") as FormArray).push(this.addExistingTache(tache.objet, tache.tempsEstime,
            tache.tempsPasse, tache.competences, tache.description, tache.statut, tache.id, tech));
          });
      }
      // Set status
      // TODO
    } else {
      this.ticketFormGroup.controls.form_type.setValue(this.demandeTypeList[0]);
      this.ticketFormGroup.controls.form_technicien.setValue(this.technicienList[0]);
      this.ticketFormGroup.controls.form_demandeur.setValue(this.demandeurList[0]);
      this.ticketFormGroup.controls.form_site.setValue(this.clientSiteList[0]);
      this.ticketFormGroup.controls.form_categorie.setValue(this.categorieList[0]);
      this.ticketFormGroup.controls.form_status.setValue(this.statusList[0]);

      console.log('ticket existe pas');
      if (tmpUser != null) {
        console.log('technicien');
        const tmp = tmpUser.gender + ' ' + tmpUser.id + ' ' + tmpUser.lastName + ' ' + tmpUser.firstName;
        this.technicienList = ['', tmp];
      }
    }
    this.technicienList.push('');
    if(this.loginAPI.isUserOperateur()) {
      console.log('is operateur');
      this.ticketFormGroup.controls.form_technicien.disable();
      if (this.ticketFormType === TicketFormType.Create) {
        this.ticketFormGroup.controls.form_technicien.setValue('');
      }
    }
  }

  addTacheGroup(): FormGroup {
    return this.fb.group({
      tacheName: ['', Validators.required],
      estimatedTacheLength: ['', Validators.required],
      tacheLength: ['', Validators.required],
      tacheCompetence: ['', Validators.required],
      tacheDescription: ['', Validators.required],
      tacheStatut: ['', Validators.required],
      tacheId: ['', Validators.required],
      technicien: ['']
    });
  }

  addExistingTache(name, estimatedLength, length, competence, description, status, id, technicien): FormGroup {
    return this.fb.group({
      tacheName: [name, Validators.required],
      estimatedTacheLength: [estimatedLength, Validators.required],
      tacheLength: [length, Validators.required],
      tacheCompetence: [competence, Validators.required],
      tacheDescription: [description, Validators.required],
      tacheStatut: [status, Validators.required],
      tacheId: [id, Validators.required],
      technicien: [technicien, Validators.required]
    });
  }

  get form_tache() {
    return this.ticketFormGroup.get('form_tache') as FormArray;
  }

  addTache() {
    this.form_tache.push(this.fb.group({
      tacheName: '',
      estimatedTacheLength: '',
      tacheLength: '',
      tacheCompetence: '',
      tacheDescription: '',
      tacheStatut: '',
      tacheId: '',
      technicien: ''
    }));
  }

  deleteTache(index) {
    this.form_tache.removeAt(index);
  }

  sendForm() {
    console.log(this.ticketFormGroup);
    // Save ticket
    const demandeur = (this.ticketFormGroup.controls.form_demandeur.value).split(' ', 10);
    const adresse = (this.ticketFormGroup.controls.form_site.value).split(' ', 10);
    const technicien = (this.ticketFormGroup.controls.form_technicien.value).split(' ', 10);


    // Traitement des taches
    let tacheList = [];
    const formTachList = (this.ticketFormGroup.controls.form_tache as FormArray);
    for (let i = 0; i < formTachList.length; i++) {
      // Todo : Technicien + ticketParent verif
      const tmpTechnicien = (formTachList.value[i].technicien).split(' ', 10);
      let tache = {
        statut: formTachList.value[i].tacheStatut,
        objet: formTachList.value[i].tacheName,
        description: formTachList.value[i].tacheDescription,
        technicien: {
          sexe: tmpTechnicien[0],
          id: +tmpTechnicien[1],
          nom: tmpTechnicien[2],
          prenom: tmpTechnicien[3]
        },
        competences: formTachList.value[i].tacheCompetence,
        tempsEstime: +formTachList.value[i].estimatedTacheLength,
        tempsPasse: +formTachList.value[i].tacheLength,
        //ticketParent: formTachList.value[i], si nouveau ticket
      };
      if (formTachList.value[i].tacheId !== '') {
        Object.assign(tache, {id: +(formTachList.value[i].tacheId)});
      }
      tacheList.push(tache);
    }


    let ticket =  {
      categorie: this.ticketFormGroup.controls.form_categorie.value,
      competences: ['Electricien', 'Frigoriste'],
      priorite: 1,
      demandeur: {
        sexe: demandeur[0],
        id: +demandeur[1],
        nom: demandeur[2],
        prenom: demandeur[3]
      },
      description: this.ticketFormGroup.controls.form_description.value,
      nomClient: 'A',
      objet: this.ticketFormGroup.controls.form_objet.value,
      statut: this.ticketFormGroup.controls.form_status.value,
      technicien: {
        sexe: technicien[0],
        id: +technicien[1],
        nom: technicien[2],
        prenom: technicien[3]
      },
      type: this.ticketFormGroup.controls.form_type.value,
      adresse: {
        numero: +adresse[0],
        rue: adresse[1] + ' ' + adresse[2],
        ville: adresse[4],
        codePostal: adresse[3]
      }
    };
    if (tacheList.length > 0) {
      Object.assign(ticket, {taches: tacheList});
    }

    if (this.ticketFormType === 'Modification ticket') {
      console.log('MODIFICATION SAVED');
      console.log(this.ticketFormGroup.value);
      Object.assign(ticket, {id: +this.ticketId});
      console.log(ticket);
      this.spinnerService.show();
      this.ticketApi.editTicket(ticket, this.clientId).subscribe(
        value => {
          console.log(value);
          this.spinnerService.hide();
          this.router.navigate(['/list-ticket']);
        },
          error => {console.log('ERROR', error); this.spinnerService.hide(); }
      );
    } else {
    // Create ticket
      console.log('CREATION SAVED');
      console.log(this.ticketFormGroup.value);
      console.log(this.ticketFormGroup.value);
      console.log(ticket);
      this.spinnerService.show();
      this.ticketApi.createTicket(ticket, this.clientId).subscribe(
        value => {
          console.log(value);
          this.spinnerService.hide();
          this.router.navigate(['/list-ticket']);
        },
          error => {console.log('ERROR', error); this.spinnerService.hide(); }
      );
    }
  }

  handleProgressBar() {
    // Todo
  }

  isCreation() {
    if (this.ticketFormType === TicketFormType.Create) {
     return true;
    } else {
      return false;
    }
  }

  isModification() {
    if (this.ticketFormType === TicketFormType.Edit) {
      return true;
     } else {
       return false;
     }
  }

  openChrono(content, index) {
    this.modalService.open(content, { centered: true });
    console.log(index);
    this.selectedTache = index;
  }


}
