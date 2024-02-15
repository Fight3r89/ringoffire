import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(),
  importProvidersFrom(provideFirestore(() => getFirestore())),
  importProvidersFrom(provideFirebaseApp(() => initializeApp({ "projectId": "ring-of-fire-41f6d", "appId": "1:269104020523:web:00d2ec9604b493d0877e6e", "storageBucket": "ring-of-fire-41f6d.appspot.com", "apiKey": "AIzaSyAC0S_rVRdaPugAPFE1Qv4-hdQZqI6P2Kw", "authDomain": "ring-of-fire-41f6d.firebaseapp.com", "messagingSenderId": "269104020523" })))]
};
