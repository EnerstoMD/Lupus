import { Component, OnInit } from '@angular/core';
import {HomeService} from './home.service';
import { GPSLocation } from '../models/home.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  position : GPSLocation
  name:string
  constructor(private homeService:HomeService) { }

  ngOnInit(): void {
    this.name = this.homeService.getName()
    this.getPosition()
  }
  getPosition(){
    this.homeService.getPosition().then(position => {
      this.position = position
    })
  }
}
