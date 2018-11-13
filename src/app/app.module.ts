import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BookListModule } from 'src/pages/book/list/book-list.module';
import { BookFormModule } from 'src/pages/book/add/book-form.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BookListModule,
    BookFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
