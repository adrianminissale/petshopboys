import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public pets: any;
  public userMessage! :string;
  public petsLength :number = 0;
  public searchForm!: FormGroup;

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      available: new FormControl(''),
      pending: new FormControl(''),
      sold: new FormControl('')
    });
  }

  onSubmit(): void {
    if (this.searchForm.invalid) {
      return;
    }

    let status :any = this.searchForm.value;

    // remove false values
    Object.keys(status).forEach(key => {
      if (!status[key]) {
        delete status[key];
      }
    });

    // create string
    status = Object.keys(status).join(',');

    this.searchService.getPets(status).subscribe({
      next: (data :any) => {
        // return only unique results
        this.pets = [...new Map(data.map((m :any) => [m.id, m])).values()];

        this.petsLength = Object.keys(data).length;
        this.userMessage = !this.petsLength ? 'We did not find any pet :(' : '';
      },
      error: (e) => {
        console.error(e);
        this.userMessage = 'Something is wrong, try again later!';
      },
    });
  }
}