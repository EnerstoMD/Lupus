import { Component,OnInit } from "@angular/core";
import { FormGroup,FormControl,Validators } from "@angular/forms";
import { AuthService } from "../auth/auth.service";
import { UserInfoService } from "./user-info.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { error } from "console";
import { Router, RouterEvent, RouterLink } from "@angular/router";
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PwdDialogComponent} from './pwd-dialog.component';

@Component({
    selector: "app-user-info",
    templateUrl: "./user-info.component.html",
    styleUrls: ["./user-info.component.css"]
})
export class UserInfoComponent implements OnInit {
    userForm = new FormGroup({
        id: new FormControl(),
        name: new FormControl("",),
        email: new FormControl("", [Validators.required, Validators.email]),
    });
    constructor(private usService:UserInfoService,
        private authService: AuthService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private chgPwdDialog:MatDialog,
        ) {}

    ngOnInit() {
        this.usService.getUserInfo().subscribe(
            (data: any) => {
                this.userForm.setValue({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                });
            },
            (error) => {
                console.log(error);
            }
        );
        this.userForm.disable();
    }
    modifyUser() {
        this.userForm.enable();
    }
    updateUser() {
        let user = this.userForm.value;
        this.usService.updateUserInfo(user).subscribe(
            (data: any) => {
                this._snackBar.open("Information mise a jour", "", {
                    duration: 1200,
                });
            },
            (error) => {
                console.log(error);
            }
        );
                
        this.userForm.disable();
    }

    updatePwd() {
        const dialogRef = this.chgPwdDialog.open(PwdDialogComponent, {
            data: {
                id: this.userForm.value.id,
            },
        });
    }
    cancelUserMod() {
        this.userForm.disable();
    }
    logout() {
        this.authService.logout().subscribe(
            (data: any) => {
                localStorage.removeItem('token');
                this._snackBar.open("Vous avez ete deconnecte", "", {
                    duration: 1200,
                });
                this.router.navigate(["/login"]);
            },
            (error)=>{
                console.log(error);
            }
        )
    }

}