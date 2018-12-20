import { Component, OnInit, ViewChild } from '@angular/core';
import { ThfPageAction, ThfModalComponent, ThfBreadcrumb, ThfTableAction, ThfTableColumn, ThfModalAction, ThfNotificationService } from '@totvs/thf-ui';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { User } from './user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild('delete')
  modalDelete: ThfModalComponent;

  users: Array<any> = [];


  pageActions: Array<ThfPageAction> = [
    { label: "Novo", url: 'user/create', icon: 'thf-icon-plus' },
    { label: "Excluir", action: () => this.modalDelete.open() }
  ];

  tableActions: Array<ThfTableAction> = [
    { label: "Editar", action: this.editUser.bind(this) },
  ]

  columns: Array<ThfTableColumn> = [
    { column: 'name', label: "nome", type: 'string' },
    { column: 'username', label: "nome do usuário", type: 'string' },
    { column: 'email', label: "email", type: 'string' },
    { column: 'cpf', label: "CPF", type: 'string' },
    { column: 'scope', label: "escopo", type: 'string' }
  ]

  deleteAction: ThfModalAction = {
    label: "Excluir", action: () => this.confirmDelete()
  }

  constructor(private router: Router, private userService: UserService,
    private notificationService: ThfNotificationService) { }

  ngOnInit() {
    this.getUser();
  }

  private getUser() {
    this.userService.getUser().subscribe((items: Array<any>) => {
      this.users = items;
    });
  }

  confirmDelete() {
    const [selectedUser] = this.users.filter(user => user.$selected);
    this.userService.deleteUser(selectedUser._id).subscribe(() => {
      this.notificationService.success(`Usuário(a) ${selectedUser.name} removido com sucesso`);
      this.getUser();
    }, () => {
      this.notificationService.error(`Erro ao remover usuário(a) ${selectedUser.name}`);
    });
    this.modalDelete.close();
  }

  editUser(user: User) {
    this.router.navigate(['user/edit', user._id]);
  }

}
