import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }

  public getPets(status :string){
    return this.httpClient.get(`https://petstore.swagger.io/v2/pet/findByStatus?status=${status}`);
  }
}
