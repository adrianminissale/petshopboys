import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from "@ngxs/store";
import { PetsState, Pet } from 'src/app/state';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  public pets!: Pet[];
  private pets$ = this.store.select(PetsState.pets);
  public displayedColumns: string[] = ['name', 'status', 'detail'];

  constructor(
    public dialog: MatDialog,
    public store: Store
  ) {
    this.pets$.subscribe( value => {
      this.pets = value;
    });
  }

  openDialog(pet: Pet) {
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
    public pet: Pet
  ) {}
}
