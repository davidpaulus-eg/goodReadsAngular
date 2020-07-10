import { Component, OnInit, Inject } from '@angular/core';
import { Book } from '../shared/book';
import { BookService } from '../services/book.service';
// import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  books: Book[];
  errMess: string;

  selectedBook: Book;
  constructor(private bookService: BookService,
              @Inject('baseURL') private baseURL) { }

    ngOnInit() {
      this.bookService.getBooks()
        .subscribe(books => this.books = books,
          errmess => this.errMess = (errmess as any));
    }

    onSelect(book: Book) {
      this.selectedBook = book;
    }

}
