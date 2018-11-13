import { NgModule } from '@angular/core';
import { BookListComponent } from './book-list.component';
import {
  MatButtonModule, MatFormFieldModule, MatInputModule,
  MatRippleModule, MatPaginatorModule, MatTableModule, MatDialogModule, MatListModule
} from '@angular/material';
import { BookService } from './book.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    BookListComponent
  ],
  imports: [
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatPaginatorModule,
    MatListModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  exports: [
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatPaginatorModule,
    BookListComponent,
    MatListModule
  ],
  providers: [BookService]
})
export class BookListModule { }
