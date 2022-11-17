import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarContatoComponent } from './listar/listar-contato.component';

const routes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  { path: 'listar', component: ListarContatoComponent },
  // { path: 'inserir', component: InserirContatoComponent },
  // {
  //   path: 'editar/:id',
  //   component: EditarContatoComponent,
  //   resolve: { tarefa: FormsContatoResolver }
  // },
  // {
  //   path: 'excluir/:id',
  //   component: ExcluirContatoComponent,
  //   resolve: { tarefa: VisualizarContatoResolver }
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContatoRoutingModule { }
