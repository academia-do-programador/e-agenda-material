import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloPaginaComponent } from './titulo-pagina/titulo-pagina.component';
import { MatIconModule } from '@angular/material/icon';
import { ItemListComponent } from './item-list/item-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';

import { DescricaoPaginaComponent } from './descricao-pagina/descricao-pagina.component';

@NgModule({
  declarations: [
    TituloPaginaComponent,
    ItemListComponent,
    DescricaoPaginaComponent
  ],
  exports: [
    TituloPaginaComponent,
    ItemListComponent,
    DescricaoPaginaComponent,

    MatTooltipModule,
    MatTabsModule,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatChipsModule,
    MatTooltipModule,
    MatTabsModule
  ]
})
export class SharedModule { }
