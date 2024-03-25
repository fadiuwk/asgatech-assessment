import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';
import { DataTableService } from 'src/app/shared/components/data-table/services/data-table.service';
import { Column } from 'src/app/shared/components/data-table/models/column';
import { Action } from 'src/app/shared/components/data-table/models/action';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  subscription = new Subscription();
  skip = 0;
  take = 10;
  columns: Column[] = [
    {
      field: 'ProductName',
      header: 'Product Name',
      type: 'hasImage',
      fieldImg: 'ProductImg',
    },
    { field: 'ProductPrice', header: 'Product Price', type: 'currency' },
    {
      field: 'AvailablePieces',
      header: 'Available Pieces',
      type: 'input-editable',
    },
  ];

  constructor(
    private dataTableService: DataTableService,
    private productsService: ProductsService
  ) {
    dataTableService.cols.set(this.columns);
    dataTableService.rows.set(
      productsService.products().slice(this.skip, this.take)
    );
    dataTableService.isLoading = false;
    dataTableService.hasPaginator = true;
    dataTableService.hasListActions = false;
    dataTableService.totalRecords = 20;
    dataTableService.showStyleHighlight = true;
  }
  ngOnInit(): void {
    this.getPageChanged();
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
    this.dataTableService.rows.set(
      this.productsService
        .products()
        .slice(skip, take)
        .filter((product) => product.AvailablePieces)
    );
  }
}
