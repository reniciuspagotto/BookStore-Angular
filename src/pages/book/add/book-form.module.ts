import { NgModule } from '@angular/core';
import { BookFormComponent } from './book-form.component';
import { MatFormFieldModule, MatSelectModule, MatInputModule, MatDialogModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BookFormComponent
  ],
  imports: [
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  exports: [BookFormComponent],
  entryComponents: [BookFormComponent]
})
export class BookFormModule { }
