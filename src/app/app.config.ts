import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { API_ENDPOINT } from './services/config/api-endpoint-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes
      
    ), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    { 
      provide: API_ENDPOINT,
      useValue: 'http://localhost:8622'
    },
    provideAnimations()
  ]
};
