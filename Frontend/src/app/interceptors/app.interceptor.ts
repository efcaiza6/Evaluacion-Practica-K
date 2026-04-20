import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = { 'X-App-Client': 'angular-app' };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return next(req.clone({ setHeaders: headers })).pipe(
    catchError((error: HttpErrorResponse) => {
      const message = error.error?.message || 'No se pudo completar la solicitud';
      window.dispatchEvent(new CustomEvent('api-error', { detail: message }));
      return throwError(() => error);
    })
  );
  
};
