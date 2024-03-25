import { Injector } from '@angular/core';
import { ProductsService } from 'src/app/features/Products/services/products.service';

export function productsDataInitializer(injector: Injector) {
  const _facebookScriptService = injector.get(ProductsService);
  return () => _facebookScriptService.load();
}
