import { Component, Inject, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Observable } from 'rxjs';
import { CalendarService } from './calendar.service';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CreateEventDialogComponent} from './createevent.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    eventColor: 'lightslategray',
    eventClick: this.openEvDialog.bind(this),
    select: this.openCreateEventDialog.bind(this),
    selectable: true,
    defaultTimedEventDuration: '00:30',
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
          if (ev['is_confirmed']=='true') {
            ev.color = 'dodgerblue'
          }
        })
      }
    )
  }

  openEvDialog(info:EventClickArg){
    const dialogRef=this.eventDialog.open(EventDataDialogComponent,{ 
      data:{
        title:info.event.title,
        start:info.event.startStr,
        end:info.event.endStr,
        id:info.event.id,
        description:info.event.extendedProps['description'],
        is_confirmed:info.event.extendedProps['is_confirmed']=='true'?true:false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchEvents()
    });
  }

  openCreateEventDialog(info:DateSelectArg){
    const dialogRef=this.eventDialog.open(CreateEventDialogComponent,{
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
  selector:'app-event-dialog',
  templateUrl:'eventdialog.html',
  styleUrls: ['./calendar.component.css']
})
export class EventDataDialogComponent implements OnInit{
  eventFormGroup = new FormGroup({
    title: new FormControl(this.data.title, Validators.required),
    startdate: new FormControl(this.calService.getDateFromFCEvent(this.data.start),[Validators.required,Validators.pattern("^([0-2][0-9][0-9][0-9])-([0-1][0-9])-([0-3][0-9])$")]),
    starttime: new FormControl(this.calService.getTimeFromFCEvent(this.data.start),[Validators.required,Validators.pattern("^([0-1][0-9]|2[0-3]):([0-5][0-9])$")]),
    enddate: new FormControl(this.calService.getDateFromFCEvent(this.data.end),[Validators.required,Validators.pattern("^([0-2][0-9][0-9][0-9])-([0-1][0-9])-([0-3][0-9])$")]),
    endtime: new FormControl(this.calService.getTimeFromFCEvent(this.data.end),[Validators.required,Validators.pattern("^([0-1][0-9]|2[0-3]):([0-5][0-9])$")]),
    description: new FormControl(this.data.description),
});

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private calService:CalendarService,
    public dialogRef:MatDialogRef<EventDataDialogComponent>,
    private _snackBar: MatSnackBar
    ){
    }
  ngOnInit(): void {
    this.eventFormGroup.disable()
  }
  unconfirmEvent(){
      this.calService.unconfirmEvent(this.data.id).subscribe(data =>{
        this.dialogRef.close()
        this._snackBar.open("Rendez-vous annule","",{
          duration:2000
        })
      })
      
  }
  confirmEvent(){
    this.calService.confirmEvent(this.data.id).subscribe(data =>{
      this._snackBar.open("Rendez-vous confirme","ok",{
        duration:2000
      })
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
  updateEvent(){
    if(!this.eventFormGroup.valid){
      this._snackBar.open("Merci de remplir correctement le formulaire" , "", {
          duration: 2000,
      });
      return;
  }
    let eventToUpdate = {
      id:this.data.id,
      title:this.eventFormGroup.value.title,
      start:this.eventFormGroup.value.startdate+'T'+this.eventFormGroup.value.starttime+":00+02:00",
      end:this.eventFormGroup.value.enddate+'T'+this.eventFormGroup.value.endtime+":00+02:00",
      description:this.eventFormGroup.value.description,
      is_confirmed:'false'
    }
    this.calService.updateEvent(this.data.id,eventToUpdate).subscribe(data =>{
      this.dialogRef.close()
      this._snackBar.open("Rendez-vous mis a jour","OK",{
        duration:2000})
    })
  }

  modifyEvent(){
    this.eventFormGroup.enable()
  }
}
