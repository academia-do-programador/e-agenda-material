import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CanActivate, Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { UsuarioService } from "src/app/core/services/usuario.service";
import { NotificationService } from "src/app/core/services/notification.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private notificacaoService: NotificationService
  ) { }

  canActivate(): Observable<boolean> {
    return this.usuarioService.usuarioLogado.pipe(
      map(usuarioLogado => {
        if (usuarioLogado)
          return true;

        this.router.navigate(['/conta/autenticar']);

        this.notificacaoService.erro(
          'Você precisa estar logado para acessar esta funcionalidade.'
        );

        return false;
      })
    )
  }
}
