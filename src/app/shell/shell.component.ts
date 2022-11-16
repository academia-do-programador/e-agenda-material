import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TokenViewModel, UsuarioTokenViewModel } from '../auth/view-models/token.view-model';
import { UsuarioService } from '../core/services/usuario.service';
import { AuthService } from '../auth/services/auth.service';
import { LocalStorageService } from '../auth/services/local-storage.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styles: [`
    .sidenav-container {
      height: 100%;
    }

    .sidenav {
      width: 270px;
    }

    .sidenav .mat-toolbar {
      background: inherit;
    }

    .mat-toolbar.mat-primary {
      position: sticky;
      top: 0;
      z-index: 1;
    }

    .mat-nav-list .mat-icon {
      margin-right: 2%;
    }
  `]
})
export class ShellComponent {
  usuarioLogado$: Observable<UsuarioTokenViewModel | null> = this.usuarioService.usuarioLogado;
  navbarExpandida: boolean = false;
  links: any[] = [
    {
      url: '/dashboard',
      texto: 'Dashboard',
      icone: 'view_timeline'
    },
    {
      url: '/tarefas/listar',
      texto: 'Tarefas',
      icone: 'check_circle'
    }
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router) { }

  public logout() {
    this.authService.logout().subscribe({
      next: () => this.processarLogout()
    });
  }

  private processarLogout() {
    this.usuarioService.logout();
    this.localStorageService.limparDadosLocais();
    this.router.navigate(['/conta/autenticar']);
  }
}
