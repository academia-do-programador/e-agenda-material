import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../core/services/usuario.service';
import { Observable } from 'rxjs';
import { UsuarioTokenViewModel } from '../auth/view-models/token.view-model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  usuarioLogado$: Observable<UsuarioTokenViewModel | null>;

  constructor(
    titulo: Title,
    private usuarioService: UsuarioService
  ) {
    titulo.setTitle('Dashboard - e-Agenda');
  }

  ngOnInit(): void {
    this.usuarioLogado$ = this.usuarioService.usuarioLogado;
  }

}
