import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification/services/notification.service';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { ContatoService } from '../services/contato.service';
import { FormsContatoViewModel } from '../view-models/forms-contato.view-model';

@Component({
  selector: 'app-inserir-contato',
  templateUrl: './inserir-contato.component.html',
  styles: [
  ]
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
    titulo.setTitle('Cadastrar Contato - e-Agenda');
  }

  ngOnInit(): void {
    this.formContato = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      empresa: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
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
