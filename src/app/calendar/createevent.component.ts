import { Component,Inject,OnInit } from "@angular/core";
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CalendarService } from './calendar.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {PatientsService} from '../patients/patients.service'
import { PersonalInfo } from '../models/patientfile.models';
import { Observable } from 'rxjs';
import { ValueConverter } from "@angular/compiler/src/render3/view/template";
import { stringify } from "querystring";

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
        patientname: new FormControl(),
        patientlastname: new FormControl(),
        patientNIR: new FormControl(),
        email: new FormControl(),
        phone: new FormControl(),
        address: new FormControl(),
        city: new FormControl(),
    });
    searchPatientFormGroup = new FormGroup({
        name: new FormControl(),
    });
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
        this.filterPatients = this.patService.searchPatient(this.searchPatientFormGroup.value.name)
        this.filterPatients.subscribe(
            patients => {
                this.patients = patients
            },
            error => this.errorMessage = error,
        )
    }

    addEvent(): void {
        let formGr = this.addEventFormGroup
        if(!formGr.valid){
            this._snackBar.open("Merci de remplir correctement le formulaire" , "", {
                duration: 2000,
            });
            return;
        }
        let desc:string = formGr.value.description?formGr.value.description:""
        if (formGr.value.patientid == null){
            this._snackBar.open("Patient non-repertorie dans base de donnees" , "", {
                duration: 2000,
            });
        } else{
            desc=desc.concat("\n\nPatient:")
            desc=desc.concat("\n",  formGr.value.patientname?formGr.value.patientname:"", " ", formGr.value.patientlastname?formGr.value.patientlastname:""," ", formGr.value.patientNIR?formGr.value.patientNIR:"")
        }
        
        desc=desc.concat("\n", formGr.value.email?formGr.value.email:"", "\n", formGr.value.phone?formGr.value.phone:"", "\n", formGr.value.address?formGr.value.address:"", "\n", formGr.value.city?formGr.value.city:"")

        formGr.patchValue({
            description: desc,
        })

        let eventObj = {
            title: formGr.value.title,
            start: formGr.value.startdate+"T"+formGr.value.starttime+":00+02:00",
            end: formGr.value.enddate+"T"+formGr.value.endtime+":00+02:00",
            description: formGr.value.description,
            consulted_patients: [formGr.value.patientid],
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
                patientname: pat.name,
                patientlastname: pat.lastname,
                patientNIR: pat.ins_matricule,
                email: pat.email,
                phone: pat.phone,
                address: pat.address,
                city: pat.city,
            },
            {emitEvent: true, onlySelf: true}
        )
    }
}