import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LocalStorageService } from './auth/services/local-storage.service';
import { UsuarioService } from './core/services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public usuarioLogado$ = this.usuarioService.usuarioLogado;

  constructor(
    titulo: Title,
    private usuarioService: UsuarioService,
    private localStorageService: LocalStorageService
  ) {
    titulo.setTitle("Início - e-Agenda");
  }

  ngOnInit() { this.logarUsuarioPersistido(); }

  private logarUsuarioPersistido() {
    const usuarioPersistido = this.localStorageService.obterUsuarioSalvo();

    const dataExpiracaoToken = this.localStorageService.obterDataExpiracaoToken();

    const tokenValido = this.usuarioService.validarExpiracaoToken(dataExpiracaoToken);

    if (usuarioPersistido && tokenValido)
      this.usuarioService.logarUsuario(usuarioPersistido);
  }
}
