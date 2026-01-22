import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})
export class BookForm implements OnInit {
  book: Omit<Book, 'id'> = {
    title: '',
    author: '',
    isbn: '',
    publishedYear: new Date().getFullYear(),
    genre: '',
    description: ''
  };
  isEditMode = false;
  bookId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.bookId = Number(id);
      const existingBook = this.bookService.getBook(this.bookId);
      if (existingBook) {
        this.book = {
          title: existingBook.title,
          author: existingBook.author,
          isbn: existingBook.isbn,
          publishedYear: existingBook.publishedYear,
          genre: existingBook.genre,
          description: existingBook.description
        };
      }
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.bookId) {
      this.bookService.updateBook(this.bookId, this.book);
    } else {
      this.bookService.addBook(this.book);
    }
    this.router.navigate(['/']);
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
