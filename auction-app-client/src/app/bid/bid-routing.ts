import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BidComponent } from './bid.component';

const routes: Routes = [
    { path: '/bid', component: BidComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BidRoutingModule { }