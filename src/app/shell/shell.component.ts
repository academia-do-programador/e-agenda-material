import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, withLatestFrom } from 'rxjs/operators';
import { TokenViewModel, UsuarioTokenViewModel } from '../auth/view-models/token.view-model';
import { UsuarioService } from '../core/services/usuario.service';
import { AuthService } from '../auth/services/auth.service';
import { LocalStorageService } from '../auth/services/local-storage.service';
import { NavigationEnd, Router } from '@angular/router';
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
export class ShellComponent implements AfterViewInit {
  usuarioLogado$: Observable<UsuarioTokenViewModel | null> = this.usuarioService.usuarioLogado;
  navbarExpandida: boolean = false;

  @ViewChild('sidebar') sidebar: MatSidenav;

  links: any[] = [
    {
      url: '/dashboard',
      texto: 'Dashboard',
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

  constructor(
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
