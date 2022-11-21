import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { ListarCategoriaComponent } from './listar/listar-categoria.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { CategoriaService } from './services/categoria.service';
import { FormsCategoriaResolver } from './services/forms-categoria.resolver';
import { VisualizarCategoriaResolver } from './services/visualizar-categoria.resolver';
import { InserirCategoriaComponent } from './inserir/inserir-categoria.component';
import { EditarCategoriaComponent } from './editar/editar-categoria.component';
import { ExcluirCategoriaComponent } from './excluir/excluir-categoria.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    ListarCategoriaComponent,
    InserirCategoriaComponent,
    EditarCategoriaComponent,
    ExcluirCategoriaComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,

    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    SharedModule
  ],

  providers: [CategoriaService, FormsCategoriaResolver, VisualizarCategoriaResolver]
})
export class CategoriaModule { }
