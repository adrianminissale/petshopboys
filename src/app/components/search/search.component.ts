import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SearchService } from 'src/app/services/search.service';
import { Store } from "@ngxs/store";
import { Pets, Pet, PetsState } from 'src/app/state';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public petsLength!: number;
  public status!: string;
  public searchForm!: FormGroup;
  private pets$ = this.store.select(PetsState.pets);
  private status$ = this.store.select(PetsState.status);

  constructor(
    private searchService: SearchService,
    private snackBar: MatSnackBar,
    private store: Store
  ) {
    this.pets$.subscribe( value => {
      this.petsLength = value.length;
    });
    this.status$.subscribe( value => {
      this.status = value;
    });
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      available: new FormControl(this.status.includes('available')),
      pending: new FormControl(this.status.includes('pending')),
      sold: new FormControl(this.status.includes('sold'))
    });
  }

  onSubmit(): void {
    if (this.searchForm.invalid) {
      return;
    }

    let status = this.searchForm.value;

    // remove false values
    Object.keys(status).forEach(key => {
      if (!status[key]) {
        delete status[key];
      }
    });

    // create string
    status = Object.keys(status).join(',');
    this.store.dispatch(new Pets.Status(status));

    this.searchService.getPets(status).subscribe({
      next: (data: any) => {
        // return only unique results
        const uniquePets: any = [...new Map(data.map((m: Pet) => [m.id, m])).values()];
        this.store.dispatch(new Pets.Search(uniquePets));

        this.petsLength = uniquePets.length;
        if (!this.petsLength) {
          this.snackBar.open('We did not find any pet!', '😢');
        }
      },
      error: (e) => {
        console.error(e);
        this.snackBar.open('Something is wrong, try again later!', '😢');
      },
    });
  }
}