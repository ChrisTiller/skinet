import { IOrder } from './../shared/models/Order';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.baseUrl + 'orders');
  }

  getOrder(id: number): Observable<IOrder> {
    return this.http.get<IOrder>(this.baseUrl + 'orders/ ' + id);
  }
}
