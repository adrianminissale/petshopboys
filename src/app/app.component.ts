import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title :string = 'PetShopBoys';
  public isUserLogged: boolean = false;

  constructor(
    private dataService: DataService
  ) {
    this.dataService.isUserLogged.subscribe( value => {
      this.isUserLogged = value;
    });
  }

  ngOnInit(): void {
    if (
      localStorage.getItem('isUserLogged') &&
      localStorage.getItem('isUserLogged') === 'true'
    ) {
      this.dataService.isUserLogged.next(true);
    } else {
      this.dataService.isUserLogged.next(false);
    }
  }

  logout(): void {
    this.dataService.isUserLogged.next(false);
    localStorage.setItem('isUserLogged', 'false');
  }
}
