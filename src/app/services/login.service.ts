import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  public getUserLogin(username: string, password: string){
    return this.httpClient.get(`https://petstore.swagger.io/v2/user/login?username=${username}&password=${password}`);
  }
}
