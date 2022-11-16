import { Injectable } from "@angular/core";
import { TokenViewModel, UsuarioTokenViewModel } from "../view-models/token.view-model";

@Injectable()
export class LocalStorageService {

  public salvarDadosLocaisUsuario(resposta: TokenViewModel): void {
    this.salvarTokenUsuario(resposta.chave);
    this.salvarDataExpiracaoToken(resposta.dataExpiracao);
    this.salvarUsuario(resposta.usuarioToken);
  }

  public salvarTokenUsuario(token: string) {
    localStorage.setItem('eAgenda.token', token);
  }

  public salvarUsuario(usuario: UsuarioTokenViewModel) {
    const jsonString = JSON.stringify(usuario);

    localStorage.setItem('eAgenda.usuario', jsonString);
  }

  public salvarDataExpiracaoToken(dataExpiracao: Date) {
    localStorage.setItem('eAgenda.dataExpiracaoToken', dataExpiracao.toString());
  }

  public obterUsuarioSalvo() {
    const usuarioJson = localStorage.getItem('eAgenda.usuario');

    if (usuarioJson)
      return JSON.parse(usuarioJson) as UsuarioTokenViewModel;

    return null;
  }

  public obterTokenUsuario(): string {
    return localStorage.getItem('eAgenda.token') ?? '';
  }

  public obterDataExpiracaoToken(): Date | null {
    const dataExpiracaoJson = localStorage.getItem('eAgenda.dataExpiracaoToken');

    if (dataExpiracaoJson)
      return new Date(dataExpiracaoJson);

    return null;
  }

  public limparDadosLocais() {
    localStorage.removeItem('eAgenda.token');
    localStorage.removeItem('eAgenda.dataExpiracaoToken');
    localStorage.removeItem('eAgenda.usuario');
  }
}
