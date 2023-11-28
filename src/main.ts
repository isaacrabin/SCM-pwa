import { APP_INITIALIZER, enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withComponentInputBinding } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { StorageService, initializeStorage } from './app/services/storage.service';
import { httpInterceptor } from './app/shared/interceptors/http.interceptor';
import { CartEffects, cartReducer } from './app/shared/store/inventory';
import { PosCartEffects } from './app/shared/store/pos/pos-cart.effects';
import { PosCartReducer } from './app/shared/store/pos/pos-cart.reducers';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeStorage,
      deps: [StorageService],
      multi: true
    },
    importProvidersFrom(IonicModule.forRoot({}), IonicStorageModule.forRoot()),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([httpInterceptor])
    ),
    provideEffects([CartEffects, PosCartEffects]),
    provideStore({ inventory: cartReducer, pos: PosCartReducer }),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
  ],
});
