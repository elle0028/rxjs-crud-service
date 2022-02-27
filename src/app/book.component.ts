import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './models/book.model';
import { BookService } from './services/book.service';

@Component({
  selector: 'hello',
  template: `<h1>Book: {{book?.name}}</h1>`,
  styles: [`h1 { font-family: Lato; }`],
})
export class BookComponent implements OnInit {
  book: Book;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.currentBook$.subscribe((x) => (this.book = x));
  }
}
