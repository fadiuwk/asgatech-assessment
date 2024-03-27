import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Order } from '../models/order';
import { lastValueFrom } from 'rxjs';
import { Product } from '../../Products/models/product';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private http = inject(HttpClient);

  orders = signal<Order[]>([]);
  cart = signal<Product[]>([]);

  load() {
    const jsonFile = 'assets/orders.json';

    return new Promise((resolve, reject) => {
      lastValueFrom(this.http.get<any>(jsonFile))
        .then((res) => {
          this.orders.set(res);
          resolve(this.orders);
        })
        .catch((res) => {
          reject(`Could not load file '${jsonFile}': ${JSON.stringify(res)}`);
        });
    });
  }
}
