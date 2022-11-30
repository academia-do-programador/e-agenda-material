import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { ContatoService } from '../services/contato.service';
import { FormsContatoViewModel } from '../view-models/forms-contato.view-model';

@Component({
  selector: 'app-inserir-contato',
  templateUrl: './inserir-contato.component.html'
})
export class InserirContatoComponent
  extends BaseFormComponent
  implements OnInit {

  public formContato: FormGroup;
  public contatoFormVM: FormsContatoViewModel = new FormsContatoViewModel();

  constructor(
    titulo: Title,
    private formBuilder: FormBuilder,
    private contatoService: ContatoService,
    private router: Router,
    private notification: NotificationService
  ) {
    super();
    titulo.setTitle('Cadastro de Contato - e-Agenda');
  }

  ngOnInit(): void {
    this.formContato = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', [Validators.required, Validators.pattern(/^[1-9]{2} [0-9]{4,5}-[0-9]{4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      empresa: ['', [Validators.required, Validators.minLength(3)]],
      cargo: ['', [Validators.required, Validators.minLength(3)]],
      favorito: [false, [Validators.required]],
    });
  }

  get nome() {
    return this.formContato.get('nome');
  }

  get telefone() {
    return this.formContato.get('telefone');
  }

  get email() {
    return this.formContato.get('email');
  }

  get empresa() {
    return this.formContato.get('empresa');
  }

  get cargo() {
    return this.formContato.get('cargo');
  }

  get favorito() {
    return this.formContato.get('favorito');
  }


  public gravar() {
    if (this.formContato.invalid) {
      this.notification.aviso('Por favor, preencha o formulário corretamente.');
      this.exibirMensagensValidacao(this.formContato);
      return;
    }

    this.contatoFormVM = Object.assign({}, this.contatoFormVM, this.formContato.value);

    this.contatoService.inserir(this.contatoFormVM)
      .subscribe({
        next: (contatoInserido) => this.processarSucesso(contatoInserido),
        error: (erro) => this.processarFalha(erro)
      });
  }

  private processarSucesso(contato: FormsContatoViewModel): void {
    this.notification.sucesso(`Contato "${contato.nome}" cadastrado com sucesso!`);
    this.router.navigate(['/contatos/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      this.notification.erro(erro);
    }
  }

}
