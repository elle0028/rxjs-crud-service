import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BookComponent } from './book.component';
import { BookService } from './services/book.service';
import { BookApiService } from './api/book.api.service';
import { BookEditComponent } from './book-edit/book-edit.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, BookComponent, BookEditComponent],
  bootstrap: [AppComponent],
  providers: [BookService, BookApiService, BookApiService],
})
export class AppModule {}
