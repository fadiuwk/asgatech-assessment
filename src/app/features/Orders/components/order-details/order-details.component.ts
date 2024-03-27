import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../models/order';
import { UsersService } from 'src/app/features/Users/services/users.service';
import { User } from 'src/app/features/Users/models/user';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';
import { Column } from 'src/app/shared/components/data-table/models/column';
import { ProductsService } from 'src/app/features/Products/services/products.service';
import { DataTableService } from 'src/app/shared/components/data-table/services/data-table.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  orderId!: number;
  order!: Order;
  userInfo!: User;

  columns: Column[] = [
    {
      field: 'ProductName',
      header: 'Product Name',
      type: 'hasImage',
      fieldImg: 'ProductImg',
    },
    { field: 'ProductPrice', header: 'Product Price', type: 'currency' },
    {
      field: 'Quantity',
      header: 'Quantity',
      type: 'text',
    },
    { field: 'TotalPrice', header: 'Total Price', type: 'currency' },
  ];
  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private usersService: UsersService,
    private dataTableService: DataTableService,
    private productsService: ProductsService
  ) {
    dataTableService.hasPaginator = false;
    dataTableService.isLoading = false;
    dataTableService.hasListActions = false;

    dataTableService.showStyleHighlight= false
    dataTableService.cols.set(this.columns)
  }

  ngOnInit(): void {
    this.getParams();
    this.getOrderDetails();
    this.getUserDetails();
    this.getProductsOfOrder()
  }

  getParams() {
    const id = this.route.snapshot.params['id'];
    this.orderId = id;
  }

  getOrderDetails() {
    this.order = this.ordersService
      .orders()
      .filter((item) => item.OrderId == this.orderId)[0];
  }

  getUserDetails() {
    this.userInfo = this.usersService.getUserDetails(this.order.UserId)[0];
  }

  getProductsOfOrder() {
    const newArray = this.order.Products.map((item: any) => {
      return {
        ...item,
        ...this.productsService.getProductDetails(item.ProductId)[0],
        TotalPrice:
          item.Quantity *
          this.productsService.getProductDetails(item.ProductId)[0]
            .ProductPrice,
      };
    });
    this.dataTableService.rows.set(newArray);
  }
}
