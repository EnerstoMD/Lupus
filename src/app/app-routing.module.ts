import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './patients/patients.component';
import { ConsultationsComponent } from './consultations/consultations.component';
import { PatientfileComponent } from './patientfile/patientfile.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  { path: 'patients', component: PatientsComponent},
  { path: 'patients/:id', component: PatientfileComponent},
  { path: 'consultations', component: ConsultationsComponent},
  { path: 'calendar', component: CalendarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
