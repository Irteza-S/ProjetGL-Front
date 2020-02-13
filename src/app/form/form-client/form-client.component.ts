import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { fbind } from 'q';
import { ClientFormType } from '../../model/clientformtype';
import { ActivatedRoute, Router } from '@angular/router';
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
              private spinnerService: Ng4LoadingSpinnerService, private router: Router) {
    this.initForm(fb);
    this.route.paramMap.subscribe(params => {
      this.clientId = params.get('clientId');
      if (this.clientId) {
        this.clientFormType = ClientFormType.Edit;
        this.spinnerService.show();
        this.clientAPI.loadClient(this.clientId).subscribe(
          value => {
            this.initPage(value);
            this.spinnerService.hide(); },
            error => {console.log('ERROR', error); this.spinnerService.hide(); }
        );
      } else {
        this.clientFormType = ClientFormType.Create;
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

    const clientName = body.client.nom;
    const clientSIREN = body.client.SIREN;
    const clientRue = body.client.adresse.rue;
    const clientNumero = body.client.adresse.numero;
    const clientCodePostal = body.client.adresse.codePostal;
    const clientVille = body.client.adresse.ville;

    this.clientFormGroup.controls.form_nom.setValue(clientName);
    this.clientFormGroup.controls.form_siren.setValue(clientSIREN);
    this.clientFormGroup.controls.form_adresse_rue.setValue(clientRue);
    this.clientFormGroup.controls.form_adresse_numero.setValue(clientNumero);
    this.clientFormGroup.controls.form_adresse_codePostal.setValue(clientCodePostal);
    this.clientFormGroup.controls.form_adresse_ville.setValue(clientVille);

    if (body.clientSiteList) {
      body.clientSiteList.forEach(element => {
        this.form_site.push(this.fb.group({
          site_numero: element.adresse.numero,
          site_codePostal: element.adresse.codePostal,
          site_rue: element.adresse.rue,
          site_ville: element.adresse.ville,
        }));
      });
      this.deleteDemandeur(0);
    }

    if (body.demandeurList) {
      body.demandeurList.forEach(element => {
        this.form_demandeur.push(this.fb.group({
          demandeurSexe: 'M',
          demandeurNom: element.demandeur.nom,
          demandeurPrenom: element.demandeur.prenom,
          demandeurSite: ''
        }));
      });
      this.deleteDemandeur(0);
    }
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
    let client =  {
      SIREN: +this.clientFormGroup.controls.form_siren.value,
      nom: this.clientFormGroup.controls.form_nom.value,
      adresse: {
        numero: +this.clientFormGroup.controls.form_adresse_numero.value,
        rue: this.clientFormGroup.controls.form_adresse_rue.value,
        ville: this.clientFormGroup.controls.form_adresse_ville.value,
        codePostal: this.clientFormGroup.controls.form_adresse_codePostal.value,
      }
    };

    if (this.clientFormType === ClientFormType.Edit) {
      console.log('MODIFICATION client SAVED');
      console.log(this.clientFormGroup.value);
      this.spinnerService.show();
      this.clientAPI.editClient(client).subscribe(
        value => {
          console.log(value);
          this.spinnerService.hide();
          this.router.navigate(['/list-client']);
        },
          error => {console.log('ERROR', error); this.spinnerService.hide(); }
      );
    } else {
      console.log('Creation client SAVED');
      console.log(this.clientFormGroup.value);
      this.spinnerService.show();
      this.clientAPI.createClient(client).subscribe(
        value => {
          console.log(value);
          this.spinnerService.hide();
          this.router.navigate(['/list-client']);
        },
          error => {console.log('ERROR', error); this.spinnerService.hide(); }
      );
    }

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
