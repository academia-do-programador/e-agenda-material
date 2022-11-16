import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { UsuarioService } from '../core/services/usuario.service';
import { Observable } from 'rxjs';
import { UsuarioTokenViewModel } from '../auth/view-models/token.view-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`
  `]
})
export class DashboardComponent implements OnInit {
  usuarioLogado$: Observable<UsuarioTokenViewModel | null>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.usuarioLogado$ = this.usuarioService.usuarioLogado;
  }

}
