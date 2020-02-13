import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { fbind } from 'q';
import { ClientFormType } from '../../model/clientformtype';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ClientAPIService } from 'src/app/services/api/client-apiservice.service';


@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css']
})

export class ClientFormComponent implements OnInit {

  clientFormType: ClientFormType;
  clientFormGroup: FormGroup;
  clientId;
  clientSiteList: ['PLO', 'PLA', 'PLI'];


  constructor(private fb: FormBuilder, private clientAPI: ClientAPIService, private route: ActivatedRoute,
              private spinnerService: Ng4LoadingSpinnerService) {
    this.initForm(fb);
    this.route.paramMap.subscribe(params => {
      this.clientId = params.get('clientId');
      if (this.clientId) {
        this.clientFormType = ClientFormType.Edit;
        /* this.spinnerService.show();
        this.clientAPI.loadClient(this.clientId).subscribe(
          value => {
            this.initPage(value);
            this.spinnerService.hide(); },
            error => {console.log('ERROR', error); this.spinnerService.hide(); }
        ); */
      } else {
        this.clientFormType = ClientFormType.Create;
        /* this.spinnerService.show();
        this.clientAPI.initNewClient().subscribe(
          value => {
            this.initPage(value);
            this.spinnerService.hide(); },
            error => {console.log('ERROR', error); this.spinnerService.hide(); }
        ); */
      }
    });
  }

  ngOnInit() {
  }

  initForm(fb: FormBuilder) {
    this.clientFormGroup = fb.group({
      form_nom: fb.control('', Validators.required),
      form_adresse_numero: fb.control('', Validators.required),
      form_adresse_codePostal: fb.control('', Validators.required),
      form_adresse_rue: fb.control('', Validators.required),
      form_adresse_ville: fb.control('', Validators.required),
      form_siren: fb.control('', Validators.required),
      form_site: this.fb.array([this.fb.group({
        site_numero: '',
        site_codePostal: '',
        site_rue: '',
        site_ville: '',
      })]),
      form_demandeur: this.fb.array([this.fb.group({
        demandeurSexe: '',
        demandeurNom: '',
        demandeurPrenom: '',
        demandeurSite: ''
      })])
    });
  }

  initPage(data) {
    const resSTR = JSON.parse(JSON.stringify(data));
    const body = JSON.parse(resSTR._body);
    console.log(body);
  }

  get form_site() {
    return this.clientFormGroup.get('form_site') as FormArray;
  }
  get form_demandeur() {
    return this.clientFormGroup.get('form_demandeur') as FormArray;
  }

  addSite() {
    this.form_site.push(this.fb.group({
      site_numero: '',
      site_codePostal: '',
      site_rue: '',
      site_ville: ''
    }));
  }

  addDemandeur() {
    this.form_demandeur.push(this.fb.group({
      demandeurSexe: '',
      demandeurNom: '',
      demandeurPrenom: '',
      demandeurSite: ''
    }));
  }

  deleteSite(index) {
    this.form_site.removeAt(index);
  }
  deleteDemandeur(index) {
    this.form_demandeur.removeAt(index);
  }

  sendForm() {
     console.log(this.clientFormGroup);
  }

  isCreation() {
    if (this.clientFormType === ClientFormType.Create) {
     return true;
    } else {
      return false;
    }
  }

  isModification() {
    if (this.clientFormType === ClientFormType.Edit) {
      return true;
     } else {
       return false;
     }
  }

}
