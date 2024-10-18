import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();

  showLoading() {
    this._loading.next(true);

    setTimeout(() => {
      this.hideLoading();
    }, 1000);
  }

  hideLoading() {
    this._loading.next(false);
  }
}
