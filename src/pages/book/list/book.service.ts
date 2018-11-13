import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBook } from 'src/interfaces/book';

@Injectable()
export class BookService {
  constructor(private _httpClient: HttpClient) { }

  getAllBooks(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/`);
  }

  saveBooks(book: IBook): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/`, book);
  }
}
