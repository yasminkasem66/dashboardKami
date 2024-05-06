import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpBackend, HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { loaderInterceptorInterceptor } from './@Core/interceptors/loader-interceptor.interceptor';

function HttpLoaderFactory(httpHandler: HttpBackend) {
  return new TranslateHttpLoader(new HttpClient(httpHandler), './assets/i18n/', '.json');
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([loaderInterceptorInterceptor])),
    provideAnimations(),
    provideAnimationsAsync(),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        useDefaultLang: true,
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpBackend],
        },
      }),
    ),
  ],
};
