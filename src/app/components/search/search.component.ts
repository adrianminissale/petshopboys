import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public pets: any;
  public petsLength :number = 0;

  searchForm = this.formBuilder.group({
    available: false,
    pending: false,
    sold: false
  });

  constructor(
    private searchService: SearchService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {}

  onSubmit(): void {
    let status :any = this.searchForm.value;

    // remove false values
    Object.keys(status).forEach(key => {
      if (!status[key]) {
        delete status[key];
      }
    });

    // create string
    status = Object.keys(status).join(',');

    this.searchService.getPets(status).subscribe((data :any)=>{
      // return only unique results
      this.pets = [...new Map(data.map((m :any) => [m.id, m])).values()];

      this.petsLength = Object.keys(data).length;
    });
  }
}