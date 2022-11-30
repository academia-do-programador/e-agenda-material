import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { throws } from 'assert';
import { Observable, tap, map, startWith } from 'rxjs';
import { ContatoService } from 'src/app/contatos/services/contato.service';
import { ListarContatoViewModel } from 'src/app/contatos/view-models/listar-contato.view-model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { CompromissoService } from '../services/compromisso.service';
import { FormsCompromissoViewModel } from '../view-models/forms-compromisso.view-model';
import { TipoLocalizacaoCompromissoEnum } from '../view-models/tipo-localizacao-compromisso.enum';

@Component({
  selector: 'app-editar-compromisso',
  templateUrl: './editar-compromisso.component.html',
  styles: [
  ]
})
export class EditarCompromissoComponent
  extends BaseFormComponent
  implements OnInit {

  public formCompromisso: FormGroup;
  public compromissoFormVM: FormsCompromissoViewModel = new FormsCompromissoViewModel();
  public contatos$: Observable<ListarContatoViewModel[]>;
  public opcoesLocal = Object.values(TipoLocalizacaoCompromissoEnum)
    .filter(v => !Number.isFinite(v));

  public exibirInputLink$: Observable<boolean> | undefined;

  constructor(
    titulo: Title,
    private formBuilder: FormBuilder,
    private compromissoService: CompromissoService,
    private contatoService: ContatoService,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NotificationService
  ) {
    super();
    titulo.setTitle('Cadastro de Compromisso - e-Agenda');
  }

  ngOnInit(): void {
    this.compromissoFormVM = this.route.snapshot.data['compromisso'];

    this.formCompromisso = this.formBuilder.group({
      assunto: ['', [Validators.required, Validators.minLength(3)]],
      tipoLocal: ['', [Validators.required]],
      link: ['', [Validators.required]],
      local: [''],
      data: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaTermino: ['', [Validators.required]],
      contatoId: ['']
    });

    this.contatos$ = this.contatoService.selecionarTodos();

    this.exibirInputLink$ = this.tipoLocal?.valueChanges.pipe(
      tap(tipoLocalEscolhido => this.trocarValidacaoTipoLocal(tipoLocalEscolhido)),
      map(valor => valor < 1),
      startWith(this.compromissoFormVM.tipoLocal < 1)
    );

    this.formCompromisso.patchValue({
      assunto: this.compromissoFormVM.assunto,
      tipoLocal: this.compromissoFormVM.tipoLocal,
      link: this.compromissoFormVM.link,
      local: this.compromissoFormVM.local,
      data: this.compromissoFormVM.data.toString().substring(0, 10),
      horaInicio: this.compromissoFormVM.horaInicio,
      horaTermino: this.compromissoFormVM.horaTermino,
      contatoId: this.compromissoFormVM.contatoId
    });
  }

  get assunto() {
    return this.formCompromisso.get('assunto');
  }

  get tipoLocal() {
    return this.formCompromisso.get('tipoLocal');
  }

  get local() {
    return this.formCompromisso.get('local');
  }

  get link() {
    return this.formCompromisso.get('link');
  }

  get data() {
    return this.formCompromisso.get('data');
  }

  get horaInicio() {
    return this.formCompromisso.get('horaInicio');
  }

  get horaTermino() {
    return this.formCompromisso.get('horaTermino');
  }

  public gravar() {
    if (this.formCompromisso.invalid) {
      this.notification.aviso('Por favor, preencha o formulário corretamente.');
      this.exibirMensagensValidacao(this.formCompromisso);
      return;
    }

    this.limparCampoTipoLocalNaoSelecionado();

    this.compromissoFormVM = Object.assign({}, this.compromissoFormVM, this.formCompromisso.value);

    this.compromissoService.editar(this.compromissoFormVM)
      .subscribe({
        next: (compromissoInserido) => this.processarSucesso(compromissoInserido),
        error: (erro) => this.processarFalha(erro)
      });
  }

  private processarSucesso(compromisso: FormsCompromissoViewModel): void {
    this.notification.sucesso(`Compromisso "${compromisso.assunto}" cadastrado com sucesso!`);
    this.router.navigate(['/compromissos/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      this.notification.erro(erro);
    }
  }

  private trocarValidacaoTipoLocal(tipoLocal: number) {
    if (tipoLocal === 0) {
      this.link?.addValidators([Validators.required]);
      this.local?.clearValidators();
    } else {
      this.local?.addValidators([Validators.required]);
      this.link?.clearValidators();
    }

    this.link?.updateValueAndValidity();
    this.local?.updateValueAndValidity();
  }

  private limparCampoTipoLocalNaoSelecionado() {
    const tipoLocalSelecionado = this.tipoLocal?.value;

    if (tipoLocalSelecionado === 0)
      this.local?.reset();
    else
      this.link?.reset();
  }
}
