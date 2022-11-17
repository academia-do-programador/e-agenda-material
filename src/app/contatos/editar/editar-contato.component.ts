import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification/services/notification.service';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { ContatoService } from '../services/contato.service';
import { FormsContatoViewModel } from '../view-models/forms-contato.view-model';

@Component({
  selector: 'app-editar-contato',
  templateUrl: './editar-contato.component.html',
  styles: [
  ]
})
export class EditarContatoComponent
  extends BaseFormComponent
  implements OnInit {

  public formContato: FormGroup;

  public contatoFormVM: FormsContatoViewModel = new FormsContatoViewModel();

  constructor(
    titulo: Title,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contatosService: ContatoService,
    private notificacao: NotificationService
  ) {
    super();
    titulo.setTitle('Editar Contato - e-Agenda');
  }

  ngOnInit(): void {
    this.contatoFormVM = this.route.snapshot.data['contato'];

    this.formContato = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      empresa: ['', [Validators.required]],
      cargo: ['', [Validators.required]]
    });

    this.formContato.patchValue({
      nome: this.contatoFormVM.nome,
      telefone: this.contatoFormVM.telefone,
      email: this.contatoFormVM.email,
      empresa: this.contatoFormVM.empresa,
      cargo: this.contatoFormVM.cargo,
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
      this.notificacao.aviso('Por favor, preencha o formulário corretamente.');
      this.exibirMensagensValidacao(this.formContato);
      return;
    }

    this.contatoFormVM = Object.assign({}, this.contatoFormVM, this.formContato.value);

    this.contatosService.editar(this.contatoFormVM)
      .subscribe({
        next: (contatoEditado) => this.processarSucesso(contatoEditado),
        error: (erro) => this.processarFalha(erro)
      });
  }

  private processarSucesso(contato: FormsContatoViewModel) {
    this.notificacao.sucesso(`Contato "${contato.nome}" editado com sucesso!`);
    this.router.navigate(['/contatos/listar']);
  }

  private processarFalha(erro: any) {
    this.notificacao.erro(erro);
  }
}
