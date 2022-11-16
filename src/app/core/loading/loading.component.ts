import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styles: [`
    .loading-container {
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0,0,0,0.7);
      z-index: 5;
    }
  `]
})
export class LoadingComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.loading$ = this.loadingService.observador;
  }
}
