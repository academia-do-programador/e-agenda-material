import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { from, map, Observable, of, shareReplay, startWith, tap } from 'rxjs';
import { ContatoService } from 'src/app/contatos/services/contato.service';
import { ListarContatoViewModel } from 'src/app/contatos/view-models/listar-contato.view-model';
import { NotificationService } from 'src/app/notification/services/notification.service';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { CompromissoService } from '../services/compromisso.service';
import { FormsCompromissoViewModel } from '../view-models/forms-compromisso.view-model';
import { TipoLocalizacaoCompromissoEnum } from '../view-models/tipo-localizacao-compromisso.enum';

@Component({
  selector: 'app-inserir-compromisso',
  templateUrl: './inserir-compromisso.component.html',
  styles: [
  ]
})
export class InserirCompromissoComponent
  extends BaseFormComponent
  implements OnInit {

  public formCompromisso: FormGroup;
  public compromissoFormVM: FormsCompromissoViewModel = new FormsCompromissoViewModel();
  public contatos$: Observable<ListarContatoViewModel[]>;
  public opcoesLocal = Object.values(TipoLocalizacaoCompromissoEnum)
    .filter(v => !Number.isFinite(v));

  public exibirInputLocal$: Observable<boolean> | undefined;

  constructor(
    titulo: Title,
    private formBuilder: FormBuilder,
    private compromissoService: CompromissoService,
    private contatoService: ContatoService,
    private router: Router,
    private notification: NotificationService
  ) {
    super();
    titulo.setTitle('Cadastro de Compromisso - e-Agenda');
  }

  ngOnInit(): void {
    this.formCompromisso = this.formBuilder.group({
      assunto: ['', [Validators.required, Validators.minLength(3)]],
      tipoLocal: [0, [Validators.required]],
      link: ['', [Validators.required]],
      local: [''],
      data: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaTermino: ['', [Validators.required]],
      contatoId: ['']
    });

    this.contatos$ = this.contatoService.selecionarTodos();

    this.exibirInputLocal$ = this.tipoLocal?.valueChanges.pipe(
      tap(tipoLocalEscolhido => this.trocarValidacaoTipoLocal(tipoLocalEscolhido)),
      map(valor => valor < 1)
    );
  }

  trocarValidacaoTipoLocal(tipoLocal: number) {
    if (tipoLocal === 0) {
      this.link?.addValidators([Validators.required]);
      this.local?.removeValidators([Validators.required]);
    } else {
      this.link?.removeValidators([Validators.required]);
      this.local?.addValidators([Validators.required]);
    }
    this.link?.updateValueAndValidity();
    this.local?.updateValueAndValidity();
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

    this.compromissoFormVM = Object.assign({}, this.compromissoFormVM, this.formCompromisso.value);

    console.log(this.compromissoFormVM);
    this.compromissoService.inserir(this.compromissoFormVM)
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

}
