import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { TarefasService } from '../services/tarefas.service';
import { FormsTarefaViewModel, ItemTarefaViewModel } from '../view-models/forms-tarefa.view-model';
import { PrioridadeTarefaEnum } from '../view-models/prioridade-tarefa.enum';
import { StatusItemTarefa } from '../view-models/status-item-tarefa.enum';

@Component({
  selector: 'app-inserir-tarefa',
  templateUrl: './inserir-tarefa.component.html',
  styles: [
  ]
})
export class InserirTarefaComponent
  extends BaseFormComponent
  implements OnInit {

  public formTarefa: FormGroup;
  public formItens: FormGroup;
  public prioridades = Object.values(PrioridadeTarefaEnum)
    .filter(v => !Number.isFinite(v));

  public colunasExibidas = ['Título do Item', 'Excluir'];
  public tarefaFormVM: FormsTarefaViewModel = new FormsTarefaViewModel();

  @ViewChild(MatTable) tabelaItens: MatTable<any>;

  constructor(
    titulo: Title,
    private formBuilder: FormBuilder,
    private tarefaService: TarefasService,
    private router: Router,
    private notification: NotificationService
  ) {
    super();
    titulo.setTitle('Cadastro de Tarefa - e-Agenda');
  }

  ngOnInit(): void {
    this.formTarefa = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      prioridade: ['', [Validators.required]],
    });

    this.formItens = this.formBuilder.group({
      tituloItem: ['']
    });

    this.formTarefa.patchValue({ prioridade: 0 });
  }

  get titulo() {
    return this.formTarefa.get('titulo');
  }

  get prioridade() {
    return this.formTarefa.get('prioridade');
  }

  get tituloItem() {
    return this.formItens.get('tituloItem');
  }

  public adicionarItem(): void {
    if (!this.tituloItem?.value) {
      this.notification.aviso('Preencha o campo antes de adicionar um item.');
      return;
    }

    let item = new ItemTarefaViewModel();
    item.titulo = this.tituloItem.value;
    item.status = StatusItemTarefa.Adicionado;

    this.tarefaFormVM.itens.push(item);

    this.tabelaItens?.renderRows();

    this.notification.aviso(`Item "${item.titulo}" adicionado com sucesso.`);
    this.formItens.reset();
  }

  public removerItem(item: ItemTarefaViewModel): void {
    this.tarefaFormVM.itens.forEach((x, index) => {
      if (x === item) {
        this.tarefaFormVM.itens.splice(index, 1);
        this.notification.aviso(`Item "${item.titulo}" removido com sucesso.`);
      }
    })
  }

  public gravar() {
    if (this.formTarefa.invalid) {
      this.notification.aviso('Por favor, preencha o formulário corretamente.');
      this.exibirMensagensValidacao(this.formTarefa);
      return;
    }

    this.tarefaFormVM = Object.assign({}, this.tarefaFormVM, this.formTarefa.value);

    this.tarefaService.inserir(this.tarefaFormVM)
      .subscribe({
        next: (tarefaInserida) => this.processarSucesso(tarefaInserida),
        error: (erro) => this.processarFalha(erro)
      })
  }

  private processarSucesso(tarefa: FormsTarefaViewModel): void {
    this.notification.sucesso(`Tarefa "${tarefa.titulo}" cadastrada com sucesso!`);
    this.router.navigate(['/tarefas/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      this.notification.erro(erro);
    }
  }

}
