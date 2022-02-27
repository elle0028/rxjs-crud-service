import { Component, OnInit } from '@angular/core';
import { allBooks } from '../api/book.api.service';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css'],
})
export class BookEditComponent implements OnInit {
  book: Book;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.currentBook$.subscribe((book) => {
      this.book = book;
    });
  }

  chooseBook() {
    const id = Math.ceil(Math.random() * allBooks.length);
    this.bookService.setCurrentBook(id);
  }

  updateBook(currentBook: Book) {
    this.bookService.updateCurrentBook(currentBook);
  }

  newBook() {
    this.bookService.setCurrentBook(-1);
  }

  createBook(book: Book) {
    this.bookService.createCurrentBook(book);
  }
}
