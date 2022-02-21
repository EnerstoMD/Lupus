import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lupus';
  isSearched:Boolean;
  constructor(){
    this.isSearched = false
  }
}
