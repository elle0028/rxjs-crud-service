import { Injectable } from '@angular/core';
import { Observable, Subject, merge, pipe, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  mergeMapTo,
  shareReplay,
  tap,
} from 'rxjs/operators';
import { BookApiService } from '../api/book.api.service';
import { BookApiModel } from '../api/models/book.api.model';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  allBooks$: Observable<Book[]>;
  // Initial (default or blank)
  // Current
  currentBook$: Observable<Book>;

  // actions
  private currentBookId$ = new Subject<number>();
  // Update
  private upsertBook$ = new Subject<Book>();
  // delete
  private deleteBook$ = new Subject<number>();

  constructor(private bookApi: BookApiService) {
    this.allBooks$ = this.bookApi
      .getAllBooks()
      .pipe(map((allBooks) => allBooks.map(this.convertBook)));

    const upsertStream$ = this.upsertBook$.pipe(
      mergeMap((book) => {
        if (book.id === -1) {
          return this.bookApi.createBook(book);
        }
        return this.updateAndGetId(book);
      }),
      mergeMap((id) => this.getAndConvertBookById(id))
    );

    const newOrGetByIdStream$ = merge(
      this.currentBookId$,
      this.deleteBook$.pipe(
        mergeMap((id) => this.bookApi.deleteBook(id).pipe(map(() => -1)))
      )
    ).pipe(
      mergeMap((id) => {
        if (id === -1) {
          return of(this.getBlankBook());
        }
        return this.getAndConvertBookById(id);
      })
    );

    this.currentBook$ = merge(upsertStream$, newOrGetByIdStream$).pipe(
      tap((book) => console.log('Current', book)),
      shareReplay(1)
    );
  }

  public setRandomBook() {
    this.setCurrentBook(this.bookApi.randomBookId());
  }

  public setCurrentBook(id: number) {
    this.currentBookId$.next(id);
  }

  public updateCurrentBook(newBook: Book) {
    this.upsertBook$.next(newBook);
  }

  public createCurrentBook(newBook: Book) {
    this.upsertBook$.next(newBook);
  }

  public deleteCurrentBook(id: number) {
    this.deleteBook$.next(id);
  }

  private getBlankBook(): Book {
    return {
      id: -1,
      authorId: -1,
      name: '',
      description: '',
    };
  }

  private updateAndGetId(book: Book): Observable<number> {
    return this.bookApi.updateBook(book).pipe(map(() => book.id));
  }

  private getAndConvertBookById(id: number): Observable<Book> {
    return this.bookApi.getBookById(id).pipe(
      tap((apiBook) => {
        if (!apiBook) {
          throw new Error('Book not found');
        }
      }),
      map(this.convertBook)
      // catchError()
    );
  }

  private convertBook(apiBook: BookApiModel): Book {
    return new Book(apiBook);
  }
}
