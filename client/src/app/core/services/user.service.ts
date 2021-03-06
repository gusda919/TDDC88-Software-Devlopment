import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../shared/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://localhost:8080/users/';

  constructor(private http: HttpClient) { }

  getUsers(query: string): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl+query);
  }

}
