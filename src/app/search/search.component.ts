import { Component, OnInit,Inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { PersonalInfo } from '../models/patientfile.models';
import {PatientsService} from '../patients/patients.service'
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent{
  searchControl = new FormControl()
  patients: PersonalInfo[] = []
  errorMessage = '';
  filteredPatients: Observable<PersonalInfo[]>
  searchedP : PersonalInfo
  listIsVisible = false
  searchcomplete = false
  observedPat: Observable<PersonalInfo>
  name:string
  @Input() id:string
  pageEvent: PageEvent;
  length = 100;
  pageSize=10;
  pageSizeOptions = [5, 10, 25, 100];

  constructor(public dialog: MatDialog, private patService:PatientsService) {
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  addPatient() {
    const dialogRef = this.dialog.open(
      PatientInfoFormDialogComponent,
      { data:{name: this.searchControl.value}}
      );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  SearchPatientByName(event:PageEvent){
    this.listIsVisible = true
    console.log(event)
    this.name=this.searchControl.value
    if (this.name == "" || this.name==null){
      this.name="*"
    }
    this.patService.countSearchedPatients(this.name).subscribe(
      count => {
        console.log(count)
        this.length = count
      }
    )
    if (event.pageSize==null||event.pageSize==undefined){
      event.pageSize=this.pageSize
    }
  
    this.filteredPatients=this.patService.searchPatientByName(this.name,event)
    this.filteredPatients.subscribe(
      patients => {
        this.patients = patients
        this.searchcomplete = true
      },
      error => {
        this.errorMessage = error
        this.searchcomplete = false
      },
    )
    return event
  }
}

@Component({
  selector: 'app-patientinfoform-dialog',
  templateUrl: 'patientinfoform.html',
  styleUrls: ['./search.component.css']
})
export class PatientInfoFormDialogComponent implements OnInit{
  public patInfoFormGroup = new FormGroup({
    name :new FormControl(this.data.name,[Validators.required]),
    lastname : new FormControl(this.data.lastname,[Validators.required]),
    gender : new FormControl(this.data.gender),
    firstnames : new FormControl(this.data.firstnames),
    birthname : new FormControl(this.data.birthname),
    ins_matricule : new FormControl(this.data.ins_matricule),
    address : new FormControl(this.data.address),
    phone : new FormControl(this.data.phone),
    email: new FormControl(this.data.email,[Validators.email]),
    city : new FormControl(this.data.city),
    postalcode : new FormControl(this.data.postalcode),
  })
  modifyState = false
  
  constructor(
    public dialogRef: MatDialogRef<PatientInfoFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PersonalInfo,
    private patService:PatientsService,
    private _snackBar: MatSnackBar,
    private router: Router
  ){}

  ngOnInit(): void {
    if (this.data.id != null){
      this.modifyState = true
    }
  }

  addPatient(): void{
    if(!this.patInfoFormGroup.valid){
      this.openSnackBar("Merci de remplir correctement les champs", "OK")
      return
    }
    let patObj = this.patInfoFormGroup.getRawValue()
    let serializedForm = JSON.stringify(patObj)
    this.patService.addPatient(serializedForm).subscribe(
      data => this.openSnackBar("Patient ajoute dans base de donnees","OK"),
      error => console.error("couldn't post because", error)
    )
    this.dialogRef.close()
  }
  updatePatientInfos(): void{
    if(!this.patInfoFormGroup.valid){
      this.openSnackBar("Merci de remplir correctement les champs", "OK")
      return
    }
    let patientToUptObj = this.patInfoFormGroup.getRawValue()
    this.patService.updatePatientInfos(this.data.id,patientToUptObj).subscribe(
      data => this.openSnackBar("Informations de patient modifies dans base de donnees","OK"),
      error => console.error("couldn't post because", error)
    )
    this.dialogRef.close()
    this.router.navigate(['/patients/'+this.data.id])
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{duration: 2000});
  }
}
