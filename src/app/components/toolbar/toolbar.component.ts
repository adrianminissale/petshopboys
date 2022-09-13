import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public isUserLogged: boolean = false;
  public title :string = '🐈 PetShopBoys';

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
