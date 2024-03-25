import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);

  products = signal<Product[]>([]);

  load() {
    const jsonFile = 'assets/porducts.json';

    return new Promise((resolve, reject) => {
      lastValueFrom(this.http.get<any>(jsonFile))
        .then((res) => {
          this.products.set(res);
          resolve(this.products);
        })
        .catch((res) => {
          reject(`Could not load file '${jsonFile}': ${JSON.stringify(res)}`);
        });
    });
  }
}
