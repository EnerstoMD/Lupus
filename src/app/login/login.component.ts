import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginFormGroup=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',Validators.required)
  })
  hidepwd=true

  constructor(
    private router:Router,
    private authService:AuthService,
    private _snackBar: MatSnackBar,
    ) { }

  seConnecter(){
    if (!this.loginFormGroup.valid){
      this._snackBar.open("Merci de remplir correctement le formulaire" , "", {
        duration: 2000,
      });
      return;
    }
    this.authService.login(this.loginFormGroup.value.email,this.loginFormGroup.value.password).subscribe(
      (data)=>{
        if(data.status==200){
          this.router.navigate(['/calendar'])
          localStorage.setItem('token',data.token)
        }
      }
    )
  }
}
