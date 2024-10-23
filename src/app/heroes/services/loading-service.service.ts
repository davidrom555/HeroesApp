import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading = signal<boolean>(false); // Signal para el estado de carga

  public loading$ = this._loading; // Exponer la signal públicamente

  showLoading() {
    this._loading.set(true); // Activa el estado de carga

    setTimeout(() => {
      this.hideLoading(); // Desactiva el estado de carga después de 1 segundo
    }, 1000);
  }

  hideLoading() {
    this._loading.set(false); // Desactiva el estado de carga
  }
}
