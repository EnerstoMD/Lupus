import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    locale:'fr',
    firstDay:1,
    aspectRatio: 2,
    nowIndicator:true,
    businessHours:{
      startTime:'8:00',
      endTime:'20:00'
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
