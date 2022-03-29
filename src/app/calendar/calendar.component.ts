import { Component, Inject, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Observable } from 'rxjs';
import { CalendarService } from './calendar.service';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CreateEventDialog} from './createevent.component';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface FCEvent{
  id:string,
  title:string,
  start:string,
  end:string,
  description:string,
  is_confirmed:boolean,
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers:[CalendarService]
})
export class CalendarComponent implements OnInit {
  constructor(
    public eventDialog: MatDialog,
    private calService:CalendarService
    ) { }
  
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
    events:[],
    eventClick: this.openEvDialog.bind(this),
    select: this.openCreateEventDialog.bind(this),
    selectable: true,
  };

  ngOnInit(): void {
    this.fetchEvents()
  }

  fetchEvents(){
    this.evs =this.calService.fetchAllEvents()
    this.evs.subscribe(
      events =>{
        this.calendarOptions.events = events
        this.calendarOptions.events.forEach(ev => {
          if (ev['is_confirmed']) {
            ev.color = 'green'
          }
        })
      }
    )
  }

  openEvDialog(info:EventClickArg){
    const dialogRef=this.eventDialog.open(EventDataDialog,{
      data:{
        title:info.event.title,
        start:info.event.start?.getHours()+':'+info.event.start?.getMinutes(),
        end:info.event.end,
        id:info.event.id,
        description:info.event.extendedProps['description'],
        is_confirmed:info.event.extendedProps['is_confirmed']
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchEvents()
    });
  }

  openCreateEventDialog(info:DateSelectArg){
    const dialogRef=this.eventDialog.open(CreateEventDialog,{
      data:{
        start:info.startStr,
        end:info.endStr
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchEvents()
    });
  }
}

@Component({
  selector:'event-dialog',
  templateUrl:'eventdialog.html',
})
export class EventDataDialog{
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FCEvent,
    private calService:CalendarService,
    public dialogRef:MatDialogRef<EventDataDialog>,
    private _snackBar: MatSnackBar
    ){}
  unconfirmEvent(){
      this.calService.unconfirmEvent(this.data.id).subscribe(data =>{
        this.dialogRef.close()
      })
      
  }
  confirmEvent(){
    this.calService.confirmEvent(this.data.id).subscribe(data =>{
      this.dialogRef.close()
    })
  }
  deleteEvent(){
    //add a control to confirm!!!
    this.calService.deleteEvent(this.data.id).subscribe(data =>{
      this.dialogRef.close()
      this._snackBar.open("Rendez-vous supprime en base", "OK")
    })
  }
}
