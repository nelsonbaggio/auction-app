import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  menus = [
    { label: 'Leilões', link: '../auction' },
    { label: 'Lances', link: '../bid' },
    { label: 'Usuários', link: '../user' },
    {
      label: 'Sair', action: () => {
        window.localStorage.removeItem('user');
        this.router.navigate(['login']);
      }
    }
  ]

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

}
