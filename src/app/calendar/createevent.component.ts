import { Component,Inject,OnInit } from "@angular/core";
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CalendarService } from './calendar.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {PatientsService} from '../patients/patients.service'
import { PersonalInfo } from '../models/patientfile.models';
import { Observable } from 'rxjs';
import { ValueConverter } from "@angular/compiler/src/render3/view/template";

@Component({
    selector: "app-createevent-dialog",
    templateUrl: "./createevent-dialog.html",
    styleUrls: ['./calendar.component.css'],
})
export class CreateEventDialogComponent {
    addEventFormGroup = new FormGroup({
        title: new FormControl(),
        startdate: new FormControl(this.calService.getDateFromFCEvent(this.data.start),[Validators.required,Validators.pattern("^([0-2][0-9][0-9][0-9])-([0-1][0-9])-([0-3][0-9])$")]),
        starttime: new FormControl(this.calService.getTimeFromFCEvent(this.data.start),[Validators.required,Validators.pattern("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$")]),
        enddate: new FormControl(this.calService.getDateFromFCEvent(this.data.end),[Validators.required,Validators.pattern("^([0-2][0-9][0-9][0-9])-([0-1][0-9])-([0-3][0-9])$")]),
        endtime: new FormControl(this.calService.getTimeFromFCEvent(this.data.end),[Validators.required,Validators.pattern("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$")]),
        description: new FormControl(),
        patientid: new FormControl(),
        email: new FormControl(),
        phone: new FormControl(),
        address: new FormControl(),
        city: new FormControl(),
    });
    patientFormControl = new FormControl()
    patients: PersonalInfo[] = []
    filterPatients: Observable<PersonalInfo[]>
    errorMessage = '';

    constructor(
        public dialogRef: MatDialogRef<CreateEventDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private calService:CalendarService,
        private _snackBar: MatSnackBar,
        private patService:PatientsService,
    ) {}
    
    searchPatient(){
        this.filterPatients = this.patService.searchPatient(this.patientFormControl.value)
        this.filterPatients.subscribe(
            patients => {
                this.patients = patients
            },
            error => this.errorMessage = error,
        )
    }

    addEvent(): void {
        if(!this.addEventFormGroup.valid){
            this._snackBar.open("Merci de remplir correctement le formulaire" , "", {
                duration: 2000,
            });
            return;
        }
        let eventObj = {
            title: this.addEventFormGroup.value.title,
            start: this.addEventFormGroup.value.startdate+"T"+this.addEventFormGroup.value.starttime+":00+02:00",
            end: this.addEventFormGroup.value.enddate+"T"+this.addEventFormGroup.value.endtime+":00+02:00",
            description: this.addEventFormGroup.value.description,
        }
        let eventToCreate = JSON.stringify(eventObj);
        this.calService.createEvent(eventToCreate).subscribe(data =>{
            this.dialogRef.close()
            this._snackBar.open("Rendez-vous ajoute", "OK")
        })
    }
    prefillInfos(pat: PersonalInfo){
        this.addEventFormGroup.patchValue(
            {
                patientid: pat.id,
                email: pat.email,
                phone: pat.phone,
                address: pat.address,
                city: pat.city,
            },
            {emitEvent: true, onlySelf: true}
        )
    }
}