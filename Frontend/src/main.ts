import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { appInterceptor } from './app/interceptors/app.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([appInterceptor])),
    importProvidersFrom(ReactiveFormsModule)
  ]
}).catch(err => console.error(err));
