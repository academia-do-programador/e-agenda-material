import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { AuthGuard } from './auth/services/auth.guard';
import { LoginGuard } from './auth/services/login.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'conta/autenticar', pathMatch: 'full' },
  { path: 'conta/autenticar', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'conta/registrar', component: RegistroComponent, canActivate: [LoginGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'tarefas',
    canActivate: [AuthGuard],
    loadChildren: () => import('./tarefas/tarefas.module')
      .then(m => m.TarefasModule)
  },
  {
    path: 'contatos',
    canActivate: [AuthGuard],
    loadChildren: () => import('./contatos/contato.module')
      .then(m => m.ContatoModule)
  },
  {
    path: 'compromissos',
    canActivate: [AuthGuard],
    loadChildren: () => import('./compromissos/compromisso.module')
      .then(m => m.CompromissoModule)
  },
  {
    path: 'categorias',
    canActivate: [AuthGuard],
    loadChildren: () => import('./categorias/categoria.module')
      .then(m => m.CategoriaModule)
  },
  {
    path: 'despesas',
    canActivate: [AuthGuard],
    loadChildren: () => import('./despesas/despesa.module')
      .then(m => m.DespesaModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
