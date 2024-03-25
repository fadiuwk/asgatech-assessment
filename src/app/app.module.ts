import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { productsDataInitializer } from './core/app-initializers/products-data.function';
import { HttpClientModule } from '@angular/common/http';
import { usersDataInitializer } from './core/app-initializers/users-data.function';
import { ordersDataInitializer } from './core/app-initializers/orders-data.function';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: productsDataInitializer,
      multi: true,
      deps: [Injector],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: usersDataInitializer,
      multi: true,
      deps: [Injector],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: ordersDataInitializer,
      multi: true,
      deps: [Injector],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
