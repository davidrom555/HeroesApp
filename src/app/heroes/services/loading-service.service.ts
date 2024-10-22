import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // Signal para manejar el estado de carga
  private _loading = signal<boolean>(false);
  
  // Exponer la señal directamente
  public loading$ = this._loading; 

  showLoading() {
    this._loading.set(true); 

    setTimeout(() => {
      this.hideLoading();
    }, 1000);
  }

  hideLoading() {
    this._loading.set(false);
  }
}
