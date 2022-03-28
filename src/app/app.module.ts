import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PatientsComponent } from './patients/patients.component';
import { ConsultationsComponent } from './consultations/consultations.component';
import { SearchComponent,AddPatientFormDialog } from './search/search.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClientModule} from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PatientfileComponent,AddHistoryFormDialog } from './patientfile/patientfile.component'; 
import {MatStepperModule} from '@angular/material/stepper';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarComponent,EventDataDialog } from './calendar/calendar.component';
import {MatTooltipModule} from '@angular/material/tooltip'; 

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin ,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    PatientsComponent,
    ConsultationsComponent,
    SearchComponent,
    AddPatientFormDialog,
    PatientfileComponent,
    AddHistoryFormDialog,
    CalendarComponent,
    EventDataDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatExpansionModule,
    MatTabsModule,
    MatDialogModule,
    MatGridListModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatStepperModule,
    FullCalendarModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    SidenavComponent,
    PatientsComponent,
    ConsultationsComponent,
    SearchComponent,
    AddPatientFormDialog,
    CalendarComponent,
    EventDataDialog,
  ]
})
export class AppModule { }
