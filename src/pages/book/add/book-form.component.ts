import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IBook } from 'src/interfaces/book';

@Component({
  selector: 'app-book-form',
  styleUrls: ['./book-form.component.css'],
  templateUrl: './book-form.component.html'
})
export class BookFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BookFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IBook) { 
      console.log(data);
    }

    ngOnInit() {
      this.form = this.fb.group({
          id: [this.data == null ? '' : this.data.id],
          code: [this.data == null ? '' : this.data.code],
          title: [this.data == null ? '' : this.data.title]
      });
  }

  save() {
    this.dialogRef.close(this.form.getRawValue());
  }
  
  close() {
    this.dialogRef.close('Cancel');
  }
}

