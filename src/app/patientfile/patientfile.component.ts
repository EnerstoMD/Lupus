import { Component, OnInit,Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PersonalInfo } from '../models/patientfile.models';
import { PatientsService } from '../patients.service';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-patientfile',
  templateUrl: './patientfile.component.html',
  styleUrls: ['./patientfile.component.css']
})
export class PatientfileComponent implements OnInit {
  longText:string
  obsPatFile : Observable <PersonalInfo>
  patFile : PersonalInfo
  errorMessage=''

  constructor(
    private route: ActivatedRoute,
    private patService: PatientsService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.obsPatFile = this.patService.findPatientById(this.route.snapshot.params['id'])
    this.obsPatFile.subscribe(
      patient => this.patFile = patient,
      error => {
        this.patFile.name = error,
        console.log("error!! ")
      },
    )
  }
  openHistoryDialog():void {
    const dialogRef = this.dialog.open(
      AddHistoryFormDialog,
      { data:{name: this.longText}}
      );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

export interface DialogData{
  name: string;
}

@Component({
  selector: 'addhistoryform-dialog',
  templateUrl: './addhistoryform.html',
})
export class AddHistoryFormDialog{

  addHistoryFormGroup = new FormGroup({
    disease: new FormControl(),
    familyLink:new FormControl(),
    comment: new FormControl()
  })

  constructor(
    public dialogRef: MatDialogRef<AddHistoryFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private patService:PatientsService,
    private _snackBar: MatSnackBar
  ){}

  addHistory():void {
    let patObj = this.addHistoryFormGroup.getRawValue()
    let serializedForm = JSON.stringify(patObj)

    this._snackBar.open("ajout antecedent mais pas en base", "OK")
    this.dialogRef.close()
  }

}