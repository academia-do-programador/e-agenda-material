import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { NotificationService } from 'src/app/notification/services/notification.service';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { confirmarSenhaValidator } from '../validators/confirmar-senha.validator';
import { RegistrarUsuarioViewModel } from '../view-models/registrar-usuario.view-model';
import { TokenViewModel } from '../view-models/token.view-model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent
  extends BaseFormComponent
  implements OnInit {
  form: FormGroup;
  registroVM: RegistrarUsuarioViewModel;

  constructor(
    titulo: Title,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private localStorageService: LocalStorageService,
    private notificacao: NotificationService
  ) {
    super();
    titulo.setTitle('Registro - e-Agenda');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.minLength(3), Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      senha: ['', [Validators.minLength(6), Validators.required]],
      confirmarSenha: ['', [Validators.required]]
    }, { validators: confirmarSenhaValidator() });
  }

  get nome() {
    return this.form.get('nome');
  }

  get email() {
    return this.form.get('email');
  }

  get senha() {
    return this.form.get('senha');
  }

  get confirmarSenha() {
    return this.form.get('confirmarSenha');
  }

  public registrar() {
    if (this.form.invalid) {
      this.notificacao.erro('Por favor, preencha o formulário corretamente antes de prosseguir.');
      this.exibirMensagensValidacao(this.form);
      return;
    }

    this.registroVM = Object.assign({}, this.registroVM, this.form.value);

    this.authService.registrarUsuario(this.registroVM)
      .subscribe({
        next: (registroRealizado) => this.processarSucesso(registroRealizado),
        error: (erro) => this.processarFalha(erro)
      });
  }

  private processarSucesso(registroRealizado: TokenViewModel) {
    this.localStorageService.salvarDadosLocaisUsuario(registroRealizado);
    this.usuarioService.logarUsuario(registroRealizado.usuarioToken);
    this.router.navigate(['/dashboard']);
  }

  private processarFalha(erro: any) {
    this.notificacao.erro(erro);
  }
}
