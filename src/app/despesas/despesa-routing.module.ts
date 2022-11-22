import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InserirDespesaComponent } from './inserir/inserir-despesa.component';
import { ListarDespesaComponent } from './listar/listar-despesa.component';

const routes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  { path: 'listar', component: ListarDespesaComponent },
  { path: 'inserir', component: InserirDespesaComponent },
  // {
  //   path: 'editar/:id',
  //   component: EditarDespesaComponent,
  //   resolve: { despesa: FormsDespesaResolver }
  // },
  // {
  //   path: 'excluir/:id',
  //   component: ExcluirDespesaComponent,
  //   resolve: { despesa: VisualizarDespesaResolver }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DespesaRoutingModule { }
