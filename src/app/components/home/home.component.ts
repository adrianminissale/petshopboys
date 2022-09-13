import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isUserLogged: boolean = false;

  constructor(
    private dataService: DataService
  ) {
    this.dataService.isUserLogged.subscribe( value => {
      this.isUserLogged = value;
    });
  }

  ngOnInit(): void {}

}
