import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getPets(){
    return this.httpClient.get(`https://petstore.swagger.io/v2/pet/findByStatus?status=available&status=pending&status=sold`);
  }
}
