import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { fbind } from 'q';
import { TicketAPIService } from '../../services/api/ticket-api.service';
import { StaffFormType } from '../../model/staffformtype';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAPIService } from '../../services/api/user-api.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UserType } from 'src/app/model/userole';
import { LoginAPIService } from 'src/app/services/login/login-api.service';

@Component({
  selector: 'app-form-staff',
  templateUrl: './form-staff.component.html',
  styleUrls: ['./form-staff.component.css']
})
export class StaffFormComponent implements OnInit {

  staffFormType: StaffFormType;
  staffFormGroup: FormGroup;
  competenceList = ['Frigoriste', 'Plombier', 'Serrurier', 'Mecanicien', 'Chauffagiste'];
  fonctionList = ['Opérateur', 'Responsable Technicien', 'Technicien'];
  sexeList = ['M', 'F'];
  userId;
  isUserAuthorized = false;

  // Competences selection
  competencesDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Tout selectionner',
    unSelectAllText: 'Tout de-selectionner',
    allowSearchFilter: true
  };

  // Competences selection
  fonctionDropdownSettings = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Tout selectionner',
    unSelectAllText: 'Tout de-selectionner',
    allowSearchFilter: true
  };

  constructor(private fb: FormBuilder, private userAPI: UserAPIService, private route: ActivatedRoute,
              private spinnerService: Ng4LoadingSpinnerService, private router: Router, private loginAPI: LoginAPIService) {
    this.initForm(fb);
    // this.ticketFormType = formType;
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
      console.log(this.userId);
      if (this.userId) {
        console.log('OLD');
        this.staffFormType = StaffFormType.Edit;
        this.spinnerService.show();
        this.userAPI.loadStaff(this.userId).subscribe(
        value => {
          this.initPage(value);
          this.spinnerService.hide(); },
          error => {console.log('ERROR', error); this.spinnerService.hide(); }
        );
        // Load user informations from backend
      } else {
        console.log('NEW');
        this.staffFormType = StaffFormType.Create;
        this.userAPI.initNewStaff().subscribe(
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

  
  initPage(data) {
    const resSTR = JSON.parse(JSON.stringify(data));
    const tmp = JSON.parse(resSTR._body);
    const body = JSON.parse(resSTR._body);
    console.log(tmp);
    this.fonctionList = body.fonctionsList;
    this.competenceList = body.competencesList;
    // Si le staff existe déjà
    if (body.staff) {
      this.userId = body.staff.staffId;
      const nom = body.staff.staffName;
      const prenom = body.staff.staffSurname;
      const mail = body.staff.staffMail;
      const telephone = body.staff.staffTel;
      const login = body.staff.staffUserName;
      const adresseRue = body.staff.staffAdress.rue;
      const adresseCodePostal = body.staff.staffAdress.codePostal;
      const adresseNumero = body.staff.staffAdress.numero;
      const adresseVille = body.staff.staffAdress.ville;
      let fonction = body.staff.staffRole;
      const staffSexe = body.staff.staffSexe;
      let staffCompetency = body.staff.staffCompetency;

      this.staffFormGroup.controls.form_sexe.setValue(staffSexe);
      this.staffFormGroup.controls.form_nom.setValue(nom);
      this.staffFormGroup.controls.form_prenom.setValue(prenom);
      this.staffFormGroup.controls.form_mail.setValue(mail);
      this.staffFormGroup.controls.form_tel.setValue(telephone);
      this.staffFormGroup.controls.form_login.setValue(login);
      this.staffFormGroup.controls.form_adresse_rue.setValue(adresseRue);
      this.staffFormGroup.controls.form_adresse_codePostal.setValue(adresseCodePostal);
      this.staffFormGroup.controls.form_adresse_ville.setValue(adresseVille);
      this.staffFormGroup.controls.form_adresse_numero.setValue(adresseNumero);
      this.staffFormGroup.controls.form_fonction.setValue(fonction);
      this.staffFormGroup.controls.form_competences.setValue(staffCompetency);
    }
    if (this.loginAPI.isUserAdmin()) {
      console.log('user is admin');
      this.isUserAuthorized = true;
    } else {
      console.log('user is notadmin');
    }
  }

  get disabledCompetences() {
    if (!this.isUserAuthorized) {
      return this.staffFormGroup.get('form_competences').disable;
    }
  }

  get disabledFonctions() {
    if (!this.isUserAuthorized) {
      return this.staffFormGroup.get('form_fonction').disable;
    }
  }

  get disabledSexe() {
    if (!this.isUserAuthorized) {
      return this.staffFormGroup.get('form_sexe').disable;
    }
  }

  initForm(fb: FormBuilder) {
    let mdpValidator = null;
    if(this.isCreation()) {
      mdpValidator = Validators.required;
    }
    this.staffFormGroup = this.fb.group({
      form_sexe: fb.control('', Validators.required),
      form_nom: fb.control('', Validators.required),
      form_prenom: fb.control('', Validators.required),
      form_adresse_numero: fb.control('', Validators.required),
      form_adresse_codePostal: fb.control('', Validators.required),
      form_adresse_rue: fb.control('', Validators.required),
      form_adresse_ville: fb.control('', Validators.required),
      form_tel: fb.control('', Validators.required),
      form_fonction: fb.control('', Validators.required),
      form_competences: fb.control(''),
      form_login: fb.control('', Validators.required),
      form_mdp: fb.control('', mdpValidator),
      form_mail: fb.control('', Validators.required),
    });
  }

  sendForm() {
    let tmp = [];
    if(this.staffFormGroup.controls.form_competences.value != '') {
      tmp = this.staffFormGroup.controls.form_competences.value;
    }
    let staff =  {
      staffSexe: this.staffFormGroup.controls.form_sexe.value[0],
      staffUserName: this.staffFormGroup.controls.form_login.value,
      staffPassword: this.staffFormGroup.controls.form_mdp.value,
      staffMail: this.staffFormGroup.controls.form_mail.value,
      staffAdress: {
        numero: +this.staffFormGroup.controls.form_adresse_numero.value,
        rue: this.staffFormGroup.controls.form_adresse_rue.value,
        ville: this.staffFormGroup.controls.form_adresse_ville.value,
        codePostal: this.staffFormGroup.controls.form_adresse_codePostal.value,
      },
      staffSurname: this.staffFormGroup.controls.form_prenom.value,
      staffName: this.staffFormGroup.controls.form_nom.value,
      staffTel: this.staffFormGroup.controls.form_tel.value,
      staffCompetency: tmp,
      staffRole: this.staffFormGroup.controls.form_fonction.value
    };
    if (this.staffFormType === StaffFormType.Edit) {
      console.log('MODIFICATION STAFF SAVED');
      console.log(this.staffFormGroup.value);
      Object.assign(staff, {staffId: +this.userId});
      console.log(staff);
      this.spinnerService.show();
      this.userAPI.saveStaff(staff).subscribe(
        value => {
          console.log(value);
          this.spinnerService.hide();
        },
        error => {console.log('ERROR', error); this.spinnerService.hide(); }
    ).add(() => {
      if (this.isUserAuthorized) {
        this.router.navigate(['/list-staff']).then(() => {
          window.location.reload();
        });
      } else {
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      }
    });
    } else {
    // Create ticket
      console.log('CREATION STAFF SAVED');
      console.log(staff);
      this.spinnerService.show();
      this.userAPI.createStaff(staff).subscribe(
        value => {
          console.log(value);
          this.spinnerService.hide();
        },
          error => {console.log('ERROR', error); this.spinnerService.hide(); }
      ).add(() => {
        if (this.isUserAuthorized) {
          this.router.navigate(['/list-staff']).then(() => {
            window.location.reload();
          });
        } else {
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        }
      });
    }
  }

  isCreation() {
    if (this.staffFormType === StaffFormType.Create) {
     return true;
    } else {
      return false;
    }
  }

  isModification() {
    if (this.staffFormType === StaffFormType.Edit) {
     return true;
    } else {
      return false;
    }
  }

}
