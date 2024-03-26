import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { productsDataInitializer } from './core/app-initializers/products-data.function';
import { usersDataInitializer } from './core/app-initializers/users-data.function';
import { ordersDataInitializer } from './core/app-initializers/orders-data.function';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
  ],
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
