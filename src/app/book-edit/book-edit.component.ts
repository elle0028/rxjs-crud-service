import { Component, OnInit } from '@angular/core';
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
    this.bookService.setRandomBook();
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

  deleteBook(id: number) {
    this.bookService.deleteCurrentBook(id);
  }
}
