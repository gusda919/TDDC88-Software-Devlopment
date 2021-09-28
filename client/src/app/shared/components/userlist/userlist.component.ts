import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';

import { User } from '../../models/user';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  constructor(private userService: UserService) {}

  searchQuery = "";
  users: User[] = [];

  ngOnInit(): void {
  }

  getUsers(): void {
    this.userService.getUsers(this.searchQuery).subscribe(users => this.users = users);
  }
  
  search(): void {
    this.getUsers();
  }

}
