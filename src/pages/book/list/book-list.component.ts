import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { BookFormComponent } from '../add/book-form.component';
import { IBook } from 'src/interfaces/book';
import { Observable } from 'rxjs';
import { BookService } from './book.service';

const titles: string[] = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-book-list',
  styleUrls: ['./book-list.component.css'],
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit {
  displayedColumns: string[] = ['code', 'title', 'options'];
  dataSource: MatTableDataSource<IBook>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public _bookService: BookService
  ) {
    // Create 100 books
    const books = Array.from({ length: 100 }, (_, k) => createBook(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(books);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addBook(): void {
    const dialogRef = this.dialog.open(BookFormComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.save(result);
    });
  }

  editBook(book) {
    this.dialog.open(BookFormComponent, {
      data: {
        code: book.code,
        title: book.title
      }
    });
  }

  deleteBook(id) {
    console.log(id);
  }

  getBooks(): void {
    this._bookService.getAllBooks().subscribe(books => this.dataSource = new MatTableDataSource(books));
  }

  save(book: IBook): void {
    this._bookService.saveBooks(book)
      .subscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createBook(id: number): IBook {
  const title =
    titles[Math.round(Math.random() * (titles.length - 1))] + ' ' +
    titles[Math.round(Math.random() * (titles.length - 1))].charAt(0) + '.';

  return {
    id: Math.round(Math.random() * 100).toString(),
    code: Math.round(Math.random() * 100).toString(),
    title: title
  };
}
