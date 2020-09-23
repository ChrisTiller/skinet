import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersComponent } from './orders.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: OrdersComponent},
  {path: ':id', component: OrderDetailsComponent, data: {breadcrumb: {alias: 'orderDetails'}}}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrdersRoutingModule { }
