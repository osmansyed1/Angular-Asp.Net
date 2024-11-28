import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async"
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { jwtInterceptor } from './interceptor/jwt.interceptor';

import {  withInterceptors } from '@angular/common/http';
import { MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalBroadcastService, MsalGuard, MsalService } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideAnimationsAsync(),
     provideHttpClient(withInterceptors([jwtInterceptor])),
     {
      provide: HTTP_INTERCEPTORS,
      useFactory: jwtInterceptor,
      multi: true
    },
     MessageService,
     MsalService,
     MsalBroadcastService,
    MsalGuard, 
     ConfirmationService,
     {
      provide: MSAL_INSTANCE,
    
      useFactory: () => {
        const msalInstance = new PublicClientApplication({
          auth: {
            clientId: environment.azureAd.clientId,
            authority: environment.azureAd.authority,
            redirectUri: environment.azureAd.redirectUri,
          },
          cache: {
            cacheLocation: 'localStorage',
            storeAuthStateInCookie: false,  // This  true if cookies are preferred for caching
          },
        });

        // Ensure MSAL is initialized (Althatically initialized, if you run into any issues, call this)
        msalInstance.initialize().catch(error => {
          console.error('MSAL Initialization Error:', error);
        });

        return msalInstance;
      },
    },



    
    {
      provide: MSAL_GUARD_CONFIG,
      useValue: {
       //interactionType: 'Redirect',
      //InteractionType:InteractionType.Redirect,//remove it it is not acceptable
        interactionType: InteractionType.Popup,

        authRequest: {
          scopes: [environment.scopeUri]
        }
      }
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useValue: {
        interactionType: 'Redirect',
        protectedResourceMap: new Map([
          [environment.APIUrl, [environment.scopeUri]]
        ])
      }
   }

  
    ]
};





//!==================================================================================


