import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../services/orders.service';
import { Product } from 'src/app/features/Products/models/product';
import { User } from 'src/app/features/Users/models/user';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { UsersService } from 'src/app/features/Users/services/users.service';
import { ProductsService } from 'src/app/features/Products/services/products.service';

@Component({
  selector: 'app-cart-order',
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule],
  templateUrl: './cart-order.component.html',
  styleUrls: ['./cart-order.component.scss'],
})
export class CartOrderComponent implements OnInit {
  step = 1;

  users!: User[];
  selectedUser!: User;

  paymentsType = [
    { label: 'Cash', value: 'Cash' },
    { label: 'Online', value: 'online' },
  ];
  selectedPaymentType!: any;

  orderId = 1415;
  constructor(
    public ordersService: OrdersService,
    public userService: UsersService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {}

  changeQuntity(type: number, product: Product) {
    this.ordersService.cart().map((item) => {
      if (item.ProductId == product.ProductId) {
        if (item.Quntity == 1 && type == -1) return;
        item.Quntity = item.Quntity ? item.Quntity + type : 1;
      }
    });
  }
  onConfirm() {
    const obj = {
      Products: this.ordersService.cart().map((item) => {
        return { ProductId: item.ProductId, Quantity: item.Quntity };
      }),
      OrderId: this.orderId + 1,
      OrderDate: String(new Date()),
      UserId: this.selectedUser.Id,
      PaymentType: this.selectedPaymentType.value,
    };
    this.ordersService.orders().push(obj)
    this.orderId += 1;
    this.reset();
    alert('Order Added Succesfully ...');
  }

  reset() {
    this.ordersService.cart.set([]);
    this.productsService.products.set(
      this.productsService.products().map((item) => {
        return { ...item, selected: false };
      })
    );
  }
}
