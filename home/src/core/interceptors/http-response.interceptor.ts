import { HostListener, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, delay, finalize, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

  constructor(private router: Router){}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const startTime = Date.now();
    localStorage.setItem('tela-anterior', window.location.pathname);

    const intervalId = setInterval(() => {
      const elapsed = Date.now() - startTime;

      if (elapsed > 3000) {
        window.dispatchEvent(new CustomEvent('elapsedUpdate', { detail: elapsed }));
        this.router.navigate(['/feedback']);
      }
    }, 100); // Atualiza a cada 100ms

    return next.handle(request).pipe(
      // delay(3500), 
      tap((ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse) {
          console.log('processing response', ev);

          if (ev.status == 200) {
            clearInterval(intervalId);
            setInterval(() => {
              let teste = localStorage.getItem('tela-anterior');
              this.router.navigate([`${teste}`])
            }, 2000)
          }
        }
      }),
      catchError((response) => {
        if (response instanceof HttpErrorResponse) {
          console.log('processing http error', response);

          switch (response.status) {
            case 401:
              console.log('401');
              break;

              default:
                console.log('error default');
              break;
          }
        }

        return throwError(response);
      }),
      finalize(() => {
        clearInterval(intervalId); // Para o contador quando a requisição finaliza
        console.log('finalize');
        
      }),
    );
  }
}