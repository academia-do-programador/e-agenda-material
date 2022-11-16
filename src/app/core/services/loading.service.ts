import { Injectable } from "@angular/core";
import { BehaviorSubject, shareReplay } from "rxjs";

@Injectable()
export class LoadingService {
  private loadingSub$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  get observador() {
    return this.loadingSub$
      .asObservable()
      .pipe(shareReplay());
  }

  public carregar() {
    this.loadingSub$.next(true);
  }

  public parar() {
    this.loadingSub$.next(false);
  }
}
