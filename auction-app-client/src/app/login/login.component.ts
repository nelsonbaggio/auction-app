import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  loginSubmit(event: { login: String, password: String, rememberUser: boolean }) {
    const {rememberUser, ...user} = event;
    window.localStorage.setItem('user', JSON.stringify(user));
    this.http.post('/login', {})
      .subscribe(() => {
        this.router.navigate(['/']);
      });

  }

}
