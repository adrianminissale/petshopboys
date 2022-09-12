import { Component } from '@angular/core';
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

  logout(): void {
    this.dataService.isUserLogged.next(false);
  }
}
