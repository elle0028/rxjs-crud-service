import { BookApiModel } from '../api/models/book.api.model';
import { AuthorModel } from './author.model';

export class Book {
  id: number;
  authorId: number;
  name: string;
  description: string;

  constructor(apiBook: BookApiModel) {
    this.id = apiBook.id;
    this.name = apiBook.name;
    this.description = apiBook.description;
    this.authorId = apiBook.authorId;
  }
}
