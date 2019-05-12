import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user/user.service';
import {Router} from '@angular/router';
import {User} from '../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;
  constructor(private user_service: UserService, private router: Router) { }

  ngOnInit() {
    this.user_service.logged_user.asObservable().subscribe(
        user => this.user = user
    )
  }
  logout(){
    this.user_service.logout();
    this.router.navigateByUrl('');
  }

}
