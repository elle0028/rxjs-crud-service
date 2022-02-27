import { Injectable } from '@angular/core';
import { Observable, Subject, merge, pipe, of } from 'rxjs';
import { map, mergeMap, mergeMapTo, shareReplay, tap } from 'rxjs/operators';
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
  private updateBook$ = new Subject<Book>();
  // delete

  constructor(private bookApi: BookApiService) {
    this.allBooks$ = this.bookApi
      .getAllBooks()
      .pipe(map((allBooks) => allBooks.map(this.convertBook)));

    this.currentBook$ = merge(
      this.updateBook$.pipe(
        mergeMap((book) => {
          if (book.id === -1) {
            return this.bookApi.createBook(book);
          }
          return this.updateAndGetId(book);
        }),
        mergeMap((id) => this.bookApi.getBookById(id)),
        map(this.convertBook)
      ),
      this.currentBookId$.pipe(
        mergeMap((id) => {
          if (id === -1) {
            return of({
              id: -1,
              authorId: -1,
              name: '',
              description: '',
            } as BookApiModel);
          }
          return this.bookApi.getBookById(id);
        }),
        map(this.convertBook)
      )
    ).pipe(
      tap((book) => console.log('Current', book)),
      shareReplay(1)
    );
  }

  public setCurrentBook(id: number) {
    this.currentBookId$.next(id);
  }

  public updateCurrentBook(newBook: Book) {
    this.updateBook$.next(newBook);
  }

  public createCurrentBook(newBook: Book) {
    this.updateBook$.next(newBook);
  }

  private updateAndGetId(book: Book): Observable<number> {
    return this.bookApi.updateBook(book).pipe(map(() => book.id));
  }

  private convertBook(apiBook: BookApiModel): Book {
    return new Book(apiBook);
  }
}
