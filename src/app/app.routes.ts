import { Routes } from '@angular/router';
import { BookList } from './components/book-list/book-list';
import { BookDetail } from './components/book-detail/book-detail';
import { BookForm } from './components/book-form/book-form';

export const routes: Routes = [
  { path: '', component: BookList },
  { path: 'detail/:id', component: BookDetail },
  { path: 'add', component: BookForm },
  { path: 'edit/:id', component: BookForm },
  { path: '**', redirectTo: '' }
];
