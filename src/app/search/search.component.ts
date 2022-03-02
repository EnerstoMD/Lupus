import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { PersonalInfo } from '../models/patientfile.models';
import {PatientsService} from '../patients.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  myControl = new FormControl()
  patients: PersonalInfo[] = []
  errorMessage = '';
  filteredPatients: Observable<PersonalInfo[]>

  searchedP : PersonalInfo

  constructor(private patService:PatientsService) {
  }

  ngOnInit(): void {
  }

  searchPatient(){
    this.filteredPatients=this.patService.searchPatient(this.myControl.value)
    this.filteredPatients.subscribe(
      patients => this.patients = patients,
      error => this.errorMessage = error
    )
  }
}
