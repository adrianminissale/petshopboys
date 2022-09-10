import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogModule} from '@angular/cdk/dialog';

@NgModule({
  exports: [
    MatDialogModule,
    DialogModule,
  ]
})
export class MaterialModule {}
