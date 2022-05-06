import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from '../patients/patients.component';
import { ConsultationsComponent } from '../consultations/consultations.component';
import { PatientfileComponent } from '../patientfile/patientfile.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { HomeComponent } from '../home/home.component';
import { AuthGuard } from '../auth/auth.guard';
import { LoginComponent } from '../login/login.component';
import { UserInfoComponent } from '../user-info/user-info.component';

const routes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'login', component:LoginComponent},
  { path: 'patients', component: PatientsComponent,canActivate:[AuthGuard]},
  { path: 'patients/:id', component: PatientfileComponent,canActivate:[AuthGuard]},
  { path: 'consultations', component: ConsultationsComponent,canActivate:[AuthGuard]},
  { path: 'calendar', component: CalendarComponent,canActivate:[AuthGuard]},
  { path: 'user-info', component: UserInfoComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
