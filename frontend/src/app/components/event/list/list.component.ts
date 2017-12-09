import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EventService } from '../../../services/event.service';
import Event from '../../../models/event.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Console } from '@angular/core/src/console';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {
  constructor(
    private eventService: EventService, private modalService: NgbModal
  ) { }

  public newEvent;
  private allItems: any[];
  
      // pager object
      pager: any = {};
  
      // paged items
      pagedItems: any[];
  eventList: Event[];

  ngOnInit() {
    this.eventService.getEvents().subscribe(event => {
      console.log(event);
      this.eventList = event;
      this.setPage(1);
    });
  }

  editEvent(event) {
    this.eventService.editEvent(event._id, event ).subscribe(
      res => {
        this.eventService.getEvents().subscribe(events => {
          this.eventList = events;

        }); console.log(res);
      },
      err => { }
    );
  }

  deleteEvent(event) {
    this.eventService.deleteEvent(event._id).subscribe(
      res => {
        this.eventList.splice(this.eventList.indexOf(event), 1);
      },
      err => { }
    );
  }

  search(event) {
    if (event) {
      this.eventService.getEvent(event).subscribe(products => {
        this.eventList = event;
      });
    } else {
      this.eventService.getEvents().subscribe(products => {
        this.eventList = event;
      });
    }
  }

  open(content, event) {
    this.modalService.open(content);

  }
  close() {
    this.eventService.getEvents().subscribe(event => {
      console.log(event);
      this.eventList = event;
    });
    
  }
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }
    // get pager object from service
    this.pager = this.eventService.getPager(this.allItems.length, page);
    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

}
