import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () =>
      import(
        'src/app/features/Products/components/product-list/product-list.component'
      ).then((c) => c.ProductListComponent),
  },
  {
    path: 'orders',
    loadComponent: () =>
      import(
        'src/app/features/Orders/components/order-list/order-list.component'
      ).then((c) => c.OrderListComponent),
  },
  {
    path: 'orders/:id',
    loadComponent: () =>
      import(
        'src/app/features/Orders/components/order-details/order-details.component'
      ).then((c) => c.OrderDetailsComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
