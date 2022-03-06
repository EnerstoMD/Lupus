import { Component, OnInit,Inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { PersonalInfo } from '../models/patientfile.models';
import {PatientsService} from '../patients.service'
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  myControl = new FormControl()
  patients: PersonalInfo[] = []
  errorMessage = '';
  filteredPatients: Observable<PersonalInfo[]>
  searchedP : PersonalInfo
  listIsVisible = false
  searchcomplete = false
  observedPat: Observable<PersonalInfo>
  name:string
  @Input() id:string

  constructor(public dialog: MatDialog, private patService:PatientsService) {
  }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(
      AddPatientFormDialog,
      { data:{name: this.name}}
      );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  searchPatient(){
    this.listIsVisible = true
    this.filteredPatients=this.patService.searchPatient(this.myControl.value)
    this.filteredPatients.subscribe(
      patients => {
        this.patients = patients
        this.searchcomplete = true
      },
      error => this.errorMessage = error,
    )
  }
}

export interface DialogData{
  name: string;
}

@Component({
  selector: 'addpatientform-dialog',
  templateUrl: 'addpatientform.html',
})
export class AddPatientFormDialog {
  addPatFormGroup = new FormGroup({
    name :new FormControl('',[Validators.required]),
    lastname : new FormControl(),
    gender : new FormControl(),
    firstnames : new FormControl(),
    birthname : new FormControl(),
    ins_matricule : new FormControl(),
    address : new FormControl(),
    phone : new FormControl(),
    email: new FormControl('',[Validators.email]),
    city : new FormControl(),
    postalcode : new FormControl(),
  })

  constructor(
    public dialogRef: MatDialogRef<AddPatientFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private patService:PatientsService,
    private _snackBar: MatSnackBar
  ){}

  addPatient(): void{
    let patObj = this.addPatFormGroup.getRawValue()
    let serializedForm = JSON.stringify(patObj)
    this.patService.addPatient(serializedForm).subscribe(
      data => this.openSnackBar("Patient ajoute dans base de donnees","OK"),
      error => console.error("couldn't post because", error)
    )
    this.dialogRef.close()
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
