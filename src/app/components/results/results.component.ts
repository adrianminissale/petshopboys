import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})

export class ResultsComponent implements OnInit {
  public pets: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getPets().subscribe((data)=>{
      this.pets = data;
    });
  }
}
