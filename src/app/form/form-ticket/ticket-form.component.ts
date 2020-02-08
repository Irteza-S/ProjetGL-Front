import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import { fbind } from 'q';
import { TicketAPIService } from '../../services/api/ticket-api.service';
import { TicketFormType } from '../../model/ticketformtype';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Timer } from '../..//model/timer';
import { State } from '../../model/state';

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

  openingDate = new FormControl(new Date());
  inputDate = new FormControl(new Date());
  startingDate = new FormControl(new Date());

  // ProgressBar
  progressBarStatus = 'success';
  progressBarValue = 0;
  ticketJSON;

  // Chrono
  private _btnPlay: string = 'Démarrer';
  private _timer: Timer = new Timer();
  private _state: State = new State();
  selectedTache = null;

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
  save() {
    console.log(this._timer);
    this.form_tache.at(this.selectedTache).patchValue({
      tacheLength: this._timer.secondes,
    });
  }

  constructor(private fb: FormBuilder, private ticketApi: TicketAPIService,
              private route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService,
              private modalService: NgbModal) {
    this.initForm(fb);
    this.route.paramMap.subscribe(params => {
      this.ticketId = params.get('ticketId');
      this.clientId = params.get('clientId');
      // Load Ticket
      if (this.ticketId) {
        this.ticketFormType = TicketFormType.Edit;
        this.spinnerService.show();
        this.ticketApi.loadTicket('123456789', '3').subscribe(
        value => {
          this.initPage(value);
          this.spinnerService.hide(); },
          error => {console.log('ERROR', error); this.spinnerService.hide(); }
        );
      } else {
        // Initialize ticket from client informations
        this.ticketFormType = TicketFormType.Create;
        this.spinnerService.show();
        this.ticketApi.initNewTicket('123456789').subscribe(
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
      form_technicien: fb.control('', Validators.required),
      form_demandeur: fb.control('', Validators.required),
      form_site: fb.control('', Validators.required),
      form_categorie: fb.control('', Validators.required),
      form_priorite: fb.control('', Validators.required),
      form_status: fb.control('', Validators.required),
      form_tache: this.fb.array([this.fb.group({
        tacheName: '',
        estimatedTacheLength: '',
        tacheLength: '',
        tacheCompetence: ''
      })])
    });
  }

  initPage(data) {
    const resSTR = JSON.parse(JSON.stringify(data));
    const body = JSON.parse(resSTR._body);
    this.categorieList = body.categorieList;
    this.demandeTypeList = body.demandeTypeList;
    this.competenceList = body.skillsList;
    this.statusList = body.statusList;

    // Techniciens
    body.technicienList.forEach((part, index) => {
      body.technicienList[index] = part.nom + ' ' + part.prenom;
    }, body.technicienList);
    this.technicienList = body.technicienList;

    // Demandeurs
    body.demandeurList.forEach((part, index) => {
      body.demandeurList[index] = part.nom + ' ' + part.prenom;
    }, body.demandeurList);
    this.demandeurList = body.demandeurList;

    // ClientSite
    body.clientSiteList.forEach((part, index) => {
      body.clientSiteList[index] = part.numero + ' ' + part.rue + ' ' + part.codePostal + ' ' + part.ville;
    }, body.clientSiteList);
    this.clientSiteList = body.clientSiteList;

    // Si le ticket existe déjà
    if (body.ticket) {
      this.technicienList = [body.ticket.technicien.nom + ' ' + body.ticket.technicien.prenom];
      this.clientSiteList = [body.ticket.clientSiteList];
      this.clientName = body.ticket.nomClient;
      this.ticketFormGroup.patchValue({
        form_description: body.ticket.description,
        form_objet: body.ticket.objet,
      });
      // Set status
      // TODO
    }
    console.log(body);
  }

  addTacheGroup(): FormGroup {
    return this.fb.group({
      tacheName: ['', Validators.required],
      estimatedTacheLength: ['', Validators.required],
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
      estimatedTacheLength: '',
      tacheLength: '',
      tacheCompetence: ''
    }));
  }

  deleteTache(index) {
    this.form_tache.removeAt(index);
  }

  sendForm() {
    // Save ticket
    if (this.ticketFormType === 'Modification ticket') {
      console.log('MODIFICATION SAVED');
    } else {
    // Create ticket
      console.log('CREATION SAVED');
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
