import { Injectable } from '@angular/core';
import { Observable, throwError, timer } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiBooks } from './mocks/book.mock';
import { BookApiModel } from './models/book.api.model';

function delayTime() {
  return Math.ceil(Math.random() * 3000) + 1;
}

export const allBooks = ApiBooks.slice();

@Injectable({
  providedIn: 'root',
})
export class BookApiService {
  getAllBooks(): Observable<BookApiModel[]> {
    return timer(delayTime()).pipe(
      tap(() => console.log('Get All')),
      map((x) => allBooks)
    );
  }

  getBookById(id: number): Observable<BookApiModel> {
    return timer(delayTime()).pipe(
      tap(() => console.log('Get ', id)),
      map((x) => allBooks.find((book) => book.id === id))
    );
  }

  createBook(book: Omit<BookApiModel, 'id'>): Observable<number> {
    const lastId = allBooks[allBooks.length - 1].id;
    const newId = lastId + 1;
    console.log(lastId, newId);
    return timer(delayTime()).pipe(
      tap(() => console.log('Create ', book)),
      tap(() =>
        allBooks.push({
          ...book,
          id: newId,
        })
      ),
      map(() => newId)
    );
  }

  updateBook(newBook: Partial<BookApiModel>): Observable<void> {
    return timer(delayTime()).pipe(
      tap(() => console.log('Update ', newBook)),
      map(() => {
        if (!newBook.id) {
          throw new Error('Book Not Found');
        }
        const oldBook = allBooks.find((book) => book.id === newBook.id);
        oldBook.authorId = newBook.authorId ?? oldBook.authorId;
        oldBook.name = newBook.name ?? oldBook.name;
        oldBook.description = newBook.description ?? oldBook.description;
      })
    );
  }

  deleteBook(id: number): Observable<void> {
    return timer(delayTime()).pipe(
      tap(() => console.log('Delete ', id)),
      map(() => {
        const bookIdx = allBooks.findIndex((book) => book.id === id);
        if (bookIdx === -1) {
          throw new Error('Book Not Found');
        }
        allBooks.splice(bookIdx, 1);
      })
    );
  }

  randomBookId(): number {
    return Math.ceil(Math.random() * allBooks.length);
  }
}
