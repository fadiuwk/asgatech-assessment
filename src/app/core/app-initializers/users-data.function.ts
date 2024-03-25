import { Injector } from '@angular/core';
import { UsersService } from 'src/app/features/Users/services/users.service';

export function usersDataInitializer(injector: Injector) {
  const _facebookScriptService = injector.get(UsersService);
  return () => _facebookScriptService.load();
}
