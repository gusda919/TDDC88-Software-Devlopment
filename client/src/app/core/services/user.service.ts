import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../shared/models/user';
import { Observable } from 'rxjs';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

@NgModule({
  imports: [
   HttpClientModule
  ]
 })



export class UserService {

  private usersUrl = 'http://localhost:8080/users/';

  constructor(private http: HttpClient) { }

  getUsers(query: string): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl+query);
  }

}
