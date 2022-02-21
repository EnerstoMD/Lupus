import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './patients/patients.component';
import { ConsultationsComponent } from './consultations/consultations.component';

const routes: Routes = [
  { path: 'patients', component: PatientsComponent},
  { path: 'consultations', component: ConsultationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
