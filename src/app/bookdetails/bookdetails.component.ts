import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../shared/book';
import { BookService } from '../services/book.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.scss']
})
export class BookdetailsComponent implements OnInit {
  book: Book;
  bookcopy: Book;
  bookIds: string[];
  prev: string;
  next: string;
  errMess: string;
  favorite = false;

  constructor(private bookservice: BookService,
              private route: ActivatedRoute,
              private location: Location,
              private favoriteService: FavoriteService,
              @Inject('baseURL') private baseURL) { }

  ngOnInit(): void {
    this.bookservice.getBookIds().subscribe(bookIds => this.bookIds = bookIds);
    this.route.params.pipe(switchMap((params: Params) =>  this.bookservice.getBook(params.id)))
    .subscribe(book => {
      this.book = book;
      this.setPrevNext(book._id);
      this.favoriteService.isFavorite(this.book._id)
      .subscribe(resp => { console.log(resp); this.favorite = (resp.exists as boolean); },
          err => console.log(err));

    },
    errmess => this.errMess = (errmess as any));
  }

  setPrevNext(bookId: string) {
    const index = this.bookIds.indexOf(bookId);
    this.prev = this.bookIds[(this.bookIds.length + index - 1) % this.bookIds.length];
    this.next = this.bookIds[(this.bookIds.length + index + 1) % this.bookIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  addToFavorites() {
    if (!this.favorite) {
      this.favoriteService.postFavorite(this.book._id)
        .subscribe(favorites => { console.log(favorites); this.favorite = true; });
    }
  }

}
