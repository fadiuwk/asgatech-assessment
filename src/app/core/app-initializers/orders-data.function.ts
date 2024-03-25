import { Injector } from '@angular/core';
import { OrdersService } from 'src/app/features/Orders/services/orders.service';

export function ordersDataInitializer(injector: Injector) {
  const _facebookScriptService = injector.get(OrdersService);
  return () => _facebookScriptService.load();
}
