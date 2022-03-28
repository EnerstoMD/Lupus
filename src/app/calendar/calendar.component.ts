import { Component, Inject, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Observable } from 'rxjs';
import { CalendarService } from './calendar.service';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface FCEvent{
  id:string,
  title:string,
  start:string,
  end:string,
  description:string
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers:[CalendarService]
})
export class CalendarComponent implements OnInit {
  constructor(public eventDialog: MatDialog,private calService:CalendarService) { }
  
  evs: Observable<Event[]>
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    locale:'fr',
    firstDay:1,
    aspectRatio: 2,
    nowIndicator:true,
    businessHours:{
      startTime:'8:00',
      endTime:'20:00'
    },
    eventClick: this.openEvDialog.bind(this),
    customButtons:{
      addEventButton:{
        text:'add event',
        click: function(){
          var dateStr = prompt('Enter a date in YYYY-MM-DD format');
          var date = new Date(dateStr + 'T00:00:00'); // will be in local time
            alert('Invalid date.');
          }
        }
      }
  };

  ngOnInit(): void {
    this.fetchEvents()
  }

  fetchEvents(){
    this.evs =this.calService.fetchAllEvents()
    this.evs.subscribe(
      events =>{
        this.calendarOptions.events = events
      }
    )
  }

  openEvDialog(info:EventClickArg){
    const dialogRef=this.eventDialog.open(EventDataDialog,{
      data:{
        title:info.event.title,
        start:info.event.start,
        end:info.event.end,
        id:info.event.id,
        description:info.event.extendedProps['description'],
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector:'event-dialog',
  templateUrl:'eventdialog.html',
})
export class EventDataDialog{
  constructor(@Inject(MAT_DIALOG_DATA) public data: FCEvent){}
}
