import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-list',
  template: `
  <section class="fw-semibold d-grid gap-1" aria-label="Itens">
    <mat-list>
      <mat-list-item
        class="row"
        *ngFor="let item of itens">
          <p class="mb-0 fs-6">{{ item.titulo }}</p>
          <span class="ms-auto"></span>
          <mat-chip-list>
            <mat-chip class="row gap-2">
              <mat-icon matChipAvatar>{{ item.situacao === 'Concluído' ? 'check_circle' : 'cancel'}}</mat-icon>
              {{ item.situacao === 'Concluído' ? 'Concluído' : 'Pendente' }}
            </mat-chip>
          </mat-chip-list>
          <mat-divider></mat-divider>
      </mat-list-item>
    </mat-list>
  </section>
  `
})
export class ItemListComponent implements OnInit {
  @Input() itens: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
