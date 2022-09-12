import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
    public isUserLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}