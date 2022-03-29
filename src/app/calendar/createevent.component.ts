import { Component,Inject } from "@angular/core";
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CalendarService } from './calendar.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: "createevent-dialog",
    templateUrl: "./createevent-dialog.html",
})
export class CreateEventDialog {

    addEventFormGroup = new FormGroup({
        title: new FormControl(),
        start: new FormControl(this.data.start),
        end: new FormControl(this.data.end),
        description: new FormControl(),
    });
    constructor(
        public dialogRef: MatDialogRef<CreateEventDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private calService:CalendarService,
        private _snackBar: MatSnackBar
    ) {}

    addEvent(): void {
        let eventObj = this.addEventFormGroup.getRawValue();
        let eventToCreate = JSON.stringify(eventObj);
        this.calService.createEvent(eventToCreate).subscribe(data =>{
            this.dialogRef.close()
            this._snackBar.open("creation rendez-vous en base", "OK")
        })
    }
}