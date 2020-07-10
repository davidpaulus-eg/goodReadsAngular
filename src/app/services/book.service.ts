import { Injectable } from '@angular/core';
import { Book } from '../shared/book';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(baseURL + 'books')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(baseURL + 'books/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  // getFeaturedDish(): Observable<Dish> {
  //   return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
  //     .pipe(catchError(this.processHTTPMsgService.handleError));
  // }

  getBookIds(): Observable<number[] | any> {
    return this.getBooks().pipe(map(books => books.map(book => book._id)))
      .pipe(catchError(error => error));
  }

  // postComment(dishId: string, comment: any) {
  //   return this.http.post(baseURL + 'dishes/' + dishId + '/comments', comment)
  //   .pipe(catchError(this.processHTTPMsgService.handleError));

  // }
}
