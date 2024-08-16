import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../Services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private token: string = '';

  constructor(private tokenService: TokenService) {
    this.tokenService.token$.subscribe(token => this.token = token);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.token) {
      const clonedRequest = request.clone({
        headers: request.headers.set('Authorization', 'Basic ' + this.token)
      });
      return next.handle(clonedRequest);
    }
    return next.handle(request);
  }
}
