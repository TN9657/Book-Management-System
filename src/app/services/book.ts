import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books: Book[] = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '978-0-7432-7356-5',
      publishedYear: 1925,
      genre: 'Fiction',
      description: 'A story of the fabulously wealthy Jay Gatsby and his love for Daisy Buchanan.'
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      isbn: '978-0-06-112008-4',
      publishedYear: 1960,
      genre: 'Fiction',
      description: 'A gripping tale of racial inequality and childhood innocence.'
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      isbn: '978-0-452-28423-4',
      publishedYear: 1949,
      genre: 'Dystopian',
      description: 'A dystopian social science fiction novel and cautionary tale.'
    }
  ];
  private nextId = 4;

  constructor() {}

  getBooks(): Book[] {
    return this.books;
  }

  getBook(id: number): Book | undefined {
    return this.books.find(book => book.id === id);
  }

  addBook(book: Omit<Book, 'id'>): Book {
    const newBook: Book = {
      ...book,
      id: this.nextId++
    };
    this.books.push(newBook);
    return newBook;
  }

  updateBook(id: number, book: Omit<Book, 'id'>): Book | undefined {
    const index = this.books.findIndex(b => b.id === id);
    if (index !== -1) {
      this.books[index] = { ...book, id };
      return this.books[index];
    }
    return undefined;
  }

  deleteBook(id: number): boolean {
    const index = this.books.findIndex(b => b.id === id);
    if (index !== -1) {
      this.books.splice(index, 1);
      return true;
    }
    return false;
  }
}
