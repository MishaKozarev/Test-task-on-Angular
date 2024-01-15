import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{
  private readonly BASIC_LINK: string ='http://51.158.107.27:82/api';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<string>> {
    return next.handle(
      req.clone({
        url: `${this.BASIC_LINK}/${req.url}`,
      })
    );
  }
}
