import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';
import { Subscription } from 'rxjs';
import { Column } from 'src/app/shared/components/data-table/models/column';
import { DataTableService } from 'src/app/shared/components/data-table/services/data-table.service';
import { OrdersService } from '../../services/orders.service';
import { ProductsService } from 'src/app/features/Products/services/products.service';
import { Action } from 'src/app/shared/components/data-table/models/action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent {
  subscription = new Subscription();
  skip = 0;
  take = 10;
  totalRecords = 20;

  columns: Column[] = [
    {
      field: 'OrderId',
      header: 'ID',
      type: 'text',
    },
    { field: 'OrderDate', header: 'Order Date', type: 'date' },
    { field: 'TotalPrice', header: 'Total Price', type: 'currency' },
    {
      field: 'PaymentType',
      header: 'Payment Type',
      type: 'text',
    },
  ];

  orderActions: Action[] = [
    {
      label: 'Preview',
      classes: ['bg-info', 'text-white'],
      function: this.previewOrder.bind(this),
    },
  ];

  constructor(
    private dataTableService: DataTableService,
    private ordersService: OrdersService,
    private productsService: ProductsService,
    private route:Router
  ) {
    dataTableService.cols.set(this.columns);
    dataTableService.isLoading = false;
    dataTableService.hasPaginator = true;
    dataTableService.hasListActions = true;
    dataTableService.actionsList = this.orderActions;
    dataTableService.totalRecords = this.totalRecords;
    dataTableService.showStyleHighlight = true;
  }
  ngOnInit(): void {
    this.getPageChanged();
    this.getData(0, 10);
  }
  getPageChanged() {
    this.subscription.add(
      this.dataTableService.getPageChanged().subscribe((data) => {
        // Handle the data returned from the service
        const page = data.page + 1;
        const rows = data.rows;
        this.skip = data.page * rows;
        this.take = rows;
        this.getData(data.page * rows, rows * page);
      })
    );
  }

  getData(skip: number, take: number) {
    this.generateFieldBody(this.ordersService.orders().slice(skip, take));
  }

  generateFieldBody(data: any) {
    const newArray = data.map((item: any) => {
      return {
        ...item,
        TotalPrice: this.calculateTotalPrice(
          item.Products.map((item: { ProductId: number }) => item.ProductId)
        ),
      };
    });
    this.dataTableService.rows.set(newArray);
  }

  calculateTotalPrice(productIds: number[]): number {
    let totalPrice = 0;
    for (const productId of productIds) {
      const product = this.productsService
        .products()
        .find((p) => p.ProductId === productId);
      if (product) {
        totalPrice += product.ProductPrice;
      }
    }
    return totalPrice;
  }

  previewOrder(data: any) {
    console.log('data', data);
    this.route.navigate(['orders' , data.OrderId])
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
