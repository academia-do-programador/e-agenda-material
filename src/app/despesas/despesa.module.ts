import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DespesaRoutingModule } from './despesa-routing.module';
import { DespesaService } from './services/despesa.service';
import { FormsDespesaResolver } from './services/forms-despesa.resolver';
import { VisualizarDespesaResolver } from './services/visualizar-despesa.resolver';
import { CategoriaModule } from '../categorias/categoria.module';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '../shared/shared.module';
import { ListarDespesaComponent } from './listar/listar-despesa.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [
    ListarDespesaComponent
  ],
  imports: [
    CommonModule,
    DespesaRoutingModule,

    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    SharedModule,

    CategoriaModule,
  ],

  providers: [DespesaService, FormsDespesaResolver, VisualizarDespesaResolver]
})
export class DespesaModule { }
