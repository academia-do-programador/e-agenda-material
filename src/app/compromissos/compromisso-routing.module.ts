import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarCompromissoComponent } from './listar/listar-compromisso.component';

const routes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  { path: 'listar', component: ListarCompromissoComponent },
  // { path: 'inserir', component: InserirCompromissoComponent },
  // {
  //   path: 'editar/:id',
  //   component: EditarCompromissoComponent,
  //   resolve: { contato: FormsCompromissoResolver }
  // },
  // {
  //   path: 'excluir/:id',
  //   component: ExcluirCompromissoComponent,
  //   resolve: { contato: VisualizarCompromissoResolver }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompromissoRoutingModule { }
