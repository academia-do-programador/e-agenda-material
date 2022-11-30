import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../shared/shared.module';

import { EditarTarefaComponent } from './editar/editar-tarefa.component';
import { ExcluirTarefaComponent } from './excluir/excluir-tarefa.component';
import { InserirTarefaComponent } from './inserir/inserir-tarefa.component';
import { ListarTarefasComponent } from './listar/listar-tarefas.component';
import { FormsTarefaResolver } from './services/forms-tarefa.resolver';
import { TarefasService } from './services/tarefas.service';
import { VisualizarTarefaResolver } from './services/visualizar-tarefa.resolver';
import { TarefasRoutingModule } from './tarefas-routing.module';

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
    MatChipsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatRadioModule,
    MatTooltipModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [TarefasService, FormsTarefaResolver, VisualizarTarefaResolver]
})
export class TarefasModule { }
