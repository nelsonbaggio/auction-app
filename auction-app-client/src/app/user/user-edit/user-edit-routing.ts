import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserEditComponent } from './user-edit.component';

const routes: Routes = [
    { path: 'user-edit', component: UserEditComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserEditRoutingModule { }