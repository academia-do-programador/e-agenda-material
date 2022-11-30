import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-titulo-pagina',
  template: `
    <h1 class="row align-items-center gap-4 fs-4 fw-semibold my-2 col-sm ms-2">
      <mat-icon *ngIf="icone">{{ icone }}</mat-icon>
      <ng-content></ng-content>
    </h1>
  `
})
export class TituloPaginaComponent {
  @Input() icone?: string;
  @Input() center?: boolean;
}
