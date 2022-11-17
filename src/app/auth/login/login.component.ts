import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { NotificationService } from 'src/app/notification/services/notification.service';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { AutenticarUsuarioViewModel } from '../view-models/autenticar-usuario.view-model';
import { TokenViewModel } from '../view-models/token.view-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    .grid-container {
      margin: 20px;
    }
  `]
})
export class LoginComponent
  extends BaseFormComponent
  implements OnInit {
  form: FormGroup;
  autenticarVM: AutenticarUsuarioViewModel;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private localStorageService: LocalStorageService,
    private notificacao: NotificationService
  ) { super(); }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      senha: ['', [Validators.minLength(6), Validators.required]]
    });
  }

  get email() {
    return this.form.get('email');
  }

  get senha() {
    return this.form.get('senha');
  }

  public login() {
    if (this.form.invalid) {
      this.notificacao.erro('Por favor, preencha o formulário corretamente antes de prosseguir.');
      this.exibirMensagensValidacao(this.form);
      return;
    }

    this.autenticarVM = Object.assign({}, this.autenticarVM, this.form.value);

    this.authService.login(this.autenticarVM).subscribe({
      // método caso o login seja realizado com sucesso
      next: (loginRealizado) => this.processarSucesso(loginRealizado),

      // método caso haja uma falha na resposta
      error: (erro) => this.processarErro(erro)
    })
  }

  private processarSucesso(loginRealizado: TokenViewModel) {
    this.localStorageService.salvarDadosLocaisUsuario(loginRealizado);
    this.usuarioService.logarUsuario(loginRealizado.usuarioToken);
    this.router.navigate(['/dashboard']);
  }

  private processarErro(erro: any) {
    this.notificacao.erro(erro);
  }
}
