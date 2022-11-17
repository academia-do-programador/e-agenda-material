import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarefasRoutingModule } from './tarefas-routing.module';
import { ListarTarefasComponent } from './listar/listar-tarefas.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { TarefasService } from './services/tarefas.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { InserirTarefaComponent } from './inserir/inserir-tarefa.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FormsTarefaResolver } from './services/forms-tarefa.resolver';
import { EditarTarefaComponent } from './editar/editar-tarefa.component';
import { ExcluirTarefaComponent } from './excluir/excluir-tarefa.component';
import { VisualizarTarefaResolver } from './services/visualizar-tarefa.resolver';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { SharedModule } from '../shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [
    ListarTarefasComponent,
    InserirTarefaComponent,
    EditarTarefaComponent,
    ExcluirTarefaComponent
  ],
  imports: [
    CommonModule,
    TarefasRoutingModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatListModule,
    MatRadioModule,
    MatTooltipModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [TarefasService, FormsTarefaResolver, VisualizarTarefaResolver]
})
export class TarefasModule { }
