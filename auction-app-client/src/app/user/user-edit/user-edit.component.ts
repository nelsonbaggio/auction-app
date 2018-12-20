import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../user';
import { ThfPageAction } from '@totvs/thf-ui';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = {
    name: '',
    username: '',
    password: '',
    cpf: '',
    email: ''
  };

  isEdit: boolean = false;

  pageActions: Array<ThfPageAction> = [
    { label: 'Salvar', action: this.updateUser, icon: 'thf-icon-plus' },
    { label: 'Voltar', action: () => { this.location.back() } }
  ]

  constructor(private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.isEdit = !!id;
    if (this.isEdit) {
      this.userService.getUser(id).subscribe((user: User) => {
        this.user = user;
      })
    }
  }

  updateUser() {
    this.user['scope'] = 'user';
    this.userService.saveUser(this.user).subscribe(user => console.log(user));
  }

}
