import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  @Input() pets :any;
  public displayedColumns: string[] = ['name', 'status', 'detail'];

  constructor(
    public dialog: MatDialog
  ) {}

  openDialog(pet :any) {
    this.dialog.open(DetailModal, {
      data: pet
    });
  }

  ngOnInit(): void { }
}

@Component({
  selector: 'detail-modal',
  templateUrl: 'detail-modal.html',
})
export class DetailModal {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public pet: any
  ) {}
}
