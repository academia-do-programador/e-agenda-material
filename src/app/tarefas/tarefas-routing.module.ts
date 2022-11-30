import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditarTarefaComponent } from './editar/editar-tarefa.component';
import { ExcluirTarefaComponent } from './excluir/excluir-tarefa.component';
import { InserirTarefaComponent } from './inserir/inserir-tarefa.component';
import { ListarTarefasComponent } from './listar/listar-tarefas.component';
import { FormsTarefaResolver } from './services/forms-tarefa.resolver';
import { VisualizarTarefaResolver } from './services/visualizar-tarefa.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  { path: 'listar', component: ListarTarefasComponent },
  { path: 'inserir', component: InserirTarefaComponent },
  {
    path: 'editar/:id',
    component: EditarTarefaComponent,
    resolve: { tarefa: FormsTarefaResolver }
  },
  {
    path: 'excluir/:id',
    component: ExcluirTarefaComponent,
    resolve: { tarefa: VisualizarTarefaResolver }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarefasRoutingModule { }
