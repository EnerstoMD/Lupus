import { Component } from "@angular/core";
import { UserInfoService } from "./user-info.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: "app-pwd-dialog",
    templateUrl: "./pwd-dialog.component.html",
    styleUrls: ["./user-info.component.css"]
})
export class PwdDialogComponent {
    hidepwd=true
    mdpformgroup = new FormGroup({
        password: new FormControl("", [Validators.required]),
    });
    constructor(
        private uinfoService:UserInfoService,
        private _snackBar: MatSnackBar,
        private dialogRef: MatDialogRef<PwdDialogComponent>,
        ) {}
    
    updatePwd() {
        this.uinfoService.updateUserPassword(this.mdpformgroup.value.password).subscribe(
            (data: any) => {
                this.dialogRef.close();
                this._snackBar.open("Mot de passe mis a jour", "", {
                    duration: 1200,
                });
            }
        );
    }
}