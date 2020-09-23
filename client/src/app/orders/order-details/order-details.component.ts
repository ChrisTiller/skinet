import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from './../orders.service';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from './../../shared/models/Order';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order: IOrder;

  constructor(private activatedRoute: ActivatedRoute, private ordersService: OrdersService, private bcService: BreadcrumbService) {
    bcService.set('@orderDetails', '');
   }

  ngOnInit(): void {
    this.loadOrder();
  }


  loadOrder() {
    this.ordersService.getOrder(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe((order: IOrder) => {
      this.order = order;
      this.bcService.set('@orderDetails', `Order # ${order.id} - ${order.status}`);
    }, error => {
      console.log(error);
    });
  }
}
