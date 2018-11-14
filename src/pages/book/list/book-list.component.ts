import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { BookFormComponent } from '../add/book-form.component';
import { IBook } from 'src/interfaces/book';
import { BookService } from './book.service';
import { ToastrService } from 'ngx-toastr';

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
    public _bookService: BookService,
    private toastr: ToastrService
  ) {

    this._bookService.getAllBooks().subscribe(element => {
      this.dataSource = new MatTableDataSource(element.data);
    });
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
        id: book.id,
        code: book.code,
        title: book.title
      }
    }).afterClosed().subscribe(element => {
      this.update(element);
    })
  }

  deleteBook(id: string) {
    this._bookService.deleteBook(id).subscribe(element => {
      if (element.success == false) {
        element.errors.forEach(element => {
          this.toastr.error(element.message);
        });
      } else {
        this._bookService.getAllBooks().subscribe(element => {
          this.dataSource = new MatTableDataSource(element.data);
        });
      }
    });
  }

  getBooks(): void {
    this._bookService.getAllBooks().subscribe(books => {
      this.dataSource = new MatTableDataSource(books)
    });
  }

  save(book: IBook): void {
    this._bookService.saveBooks({
      ...book,
      ativo: true
    }).subscribe(element => {

      if (element.success == false) {
        element.errors.forEach(element => {
          this.toastr.error(element.message);
        });
      } else {
        this.toastr.success("Livro cadastrado com sucesso");
        this._bookService.getAllBooks().subscribe(element => {
          this.dataSource = new MatTableDataSource(element.data);
        });
      }
    });
  }

  update(book: IBook): void {
    this._bookService.updateBooks({
      ...book,
      ativo: true
    }).subscribe(element => {
      if (element.success == false) {
        element.errors.forEach(element => {
          this.toastr.error(element.message);
        });
      } else {
        this.toastr.success("Livro atualizado com sucesso");
        this._bookService.getAllBooks().subscribe(element => {
          this.dataSource = new MatTableDataSource(element.data);
        });
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}