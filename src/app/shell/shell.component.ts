import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, withLatestFrom } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
import { LocalStorageService } from '../auth/services/local-storage.service';
import { UsuarioTokenViewModel } from '../auth/view-models/token.view-model';
import { LoadingService } from '../core/services/loading.service';
import { UsuarioService } from '../core/services/usuario.service';

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
export class ShellComponent implements AfterViewInit {
  usuarioLogado$: Observable<UsuarioTokenViewModel | null> = this.usuarioService.usuarioLogado;
  navbarExpandida: boolean = false;

  @ViewChild('sidebar') sidebar: MatSidenav;

  links: any[] = [
    {
      url: '/dashboard',
      texto: 'Painel de Controle',
      icone: 'view_timeline'
    },
    {
      url: '/tarefas',
      texto: 'Tarefas',
      icone: 'check_circle'
    },
    {
      url: '/contatos',
      texto: 'Contatos',
      icone: 'group'
    },
    {
      url: '/compromissos',
      texto: 'Compromissos',
      icone: 'calendar_month'
    },
    {
      url: '/categorias',
      texto: 'Categorias',
      icone: 'category'
    },
    {
      url: '/despesas',
      texto: 'Despesas',
      icone: 'payments'
    }
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  carregando$ = this.loadingService.observador;

  constructor(
    private loadingService: LoadingService,
    private breakpointObserver: BreakpointObserver,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router) { }


  ngAfterViewInit(): void {
    this.observarFechamentoNavbar();
  }

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

  private observarFechamentoNavbar() {
    this.router.events.pipe(
      withLatestFrom(this.isHandset$),
      filter(([a, b]) => b && a instanceof NavigationEnd)
    ).subscribe(() => this.sidebar.close());
  }
}
