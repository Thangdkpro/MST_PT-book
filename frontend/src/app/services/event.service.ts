import Event from '../models/event.model';
import { Observable } from 'rxjs/Rx';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Response, Headers, Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import * as _ from 'underscore';


@Injectable()
export class EventService {
  api_url = environment.domain;
  eventUrl = `${this.api_url}/events`;
  options;
  authToken;
  constructor(private http: HttpClient) {}

  loadToken() {
    this.authToken = localStorage.getItem('token');
  }

  createEvent(event: Event): Observable<any> {
    this.loadToken(); // Ge
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.authToken);
    console.log(this.authToken);
    return this.http.post(`${this.eventUrl}`, event, { headers: headers });
  }

  getEvents(): Observable<Event[]> {
    this.loadToken(); // Ge
    let headers = new HttpHeaders();
    headers= headers.set('Authorization', this.authToken);

    return this.http.get(`${this.eventUrl}`, {withCredentials: true, headers: headers}).map(res => {
        return res['events'] as Event[];

      });
  }


  getEvent(id: string): Observable<Event> {
    this.loadToken(); // Ge
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.authToken);

    const getUrl = `${this.eventUrl}/${id}`;
    return this.http.get(getUrl, { withCredentials: true, headers: headers }).map(res => {
      console.log(res);
      return res['events']._id as Event;
    });
  }




  deleteEvent(id: string): any {
    this.loadToken(); // Ge
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.authToken);

    const deleteUrl = `${this.eventUrl}/${id}`;
    return this.http.delete(deleteUrl, { withCredentials: true, headers: headers } ).map(res => {
        return res;
      });
  }
  
  editEvent(id: string, event: Event): any {
    this.loadToken(); // Ge
    let headers = new HttpHeaders();
    headers= headers.set('Authorization', this.authToken);

    const putUrl = `${this.eventUrl}/${id}`;
    return this.http.put(putUrl, event , { withCredentials: true, headers: headers } ).map(res => {
        return res;
      });
  }
  
    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = _.range(startPage, endPage + 1);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }


  
}
