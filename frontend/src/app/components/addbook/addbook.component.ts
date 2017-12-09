import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import Book from '../../models/book.model'

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {

  constructor(private bookService:BookService, private router:Router) {}

  ngOnInit() {
  }
  public book:Book=new Book();

  addbook(){
  	this.bookService.createBook(this.book).subscribe(
  		res => {

        this.book = new Book();
        console.log(res);
      },
      err => {
        console.log(err);
      }
  	);
  }

}
