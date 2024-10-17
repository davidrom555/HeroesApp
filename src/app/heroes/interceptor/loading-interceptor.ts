import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading-service.service';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Mostrar el loading
    this.loadingService.showLoading();

    return next.handle(req).pipe(
      // Ocultar el loading cuando finaliza la solicitud
      finalize(() => this.loadingService.hideLoading())
    );
  }
}
