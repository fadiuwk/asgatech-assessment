import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/features/Products/services/products.service';
import { Product } from 'src/app/features/Products/models/product';
import { OrdersService } from '../../services/orders.service';
import { CartOrderComponent } from '../cart-order/cart-order.component';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [CommonModule, CartOrderComponent],
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
})
export class CreateOrderComponent {
  cart!: Product[];

  constructor(
    public productsService: ProductsService,
    public ordersService: OrdersService
  ) {
    productsService.products.set(
      productsService.products().filter((item) => item.AvailablePieces)
    );
  }

  onAddToCart(product: Product) {
    this.productsService.products().map((item) => {
      if (item.ProductId == product.ProductId) {
        item.selected = !item.selected;
      }
    });

    this.ordersService.cart().push(product);
    const newArray = this.ordersService.cart().map((item: any) => {
      return {
        ...item,
        Quntity: 1,
      };
    });
    this.ordersService.cart.set(newArray);
  }
}
