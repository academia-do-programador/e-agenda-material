import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification/services/notification.service';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { TarefasService } from '../services/tarefas.service';
import { FormsTarefaViewModel, ItemTarefaViewModel } from '../view-models/forms-tarefa.view-model';
import { PrioridadeTarefaEnum } from '../view-models/prioridade-tarefa.enum';
import { StatusItemTarefa } from '../view-models/status-item-tarefa.enum';

@Component({
  selector: 'app-editar-tarefa',
  templateUrl: './editar-tarefa.component.html',
  styles: [
  ]
})
export class EditarTarefaComponent
  extends BaseFormComponent
  implements OnInit {

  public formTarefa: FormGroup;
  public formItens: FormGroup;
  public prioridades = Object.values(PrioridadeTarefaEnum).filter(v => !Number.isFinite(v));

  public tarefaFormVM: FormsTarefaViewModel = new FormsTarefaViewModel();

  public colunasExibidas = ['Título', 'Situação', 'Ações'];

  constructor(
    titulo: Title,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tarefasService: TarefasService,
    private notificacao: NotificationService
  ) {
    super();
    titulo.setTitle('Editar Tarefa - e-Agenda');
  }

  ngOnInit(): void {
    this.tarefaFormVM = this.route.snapshot.data['tarefa'];

    this.formTarefa = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      prioridade: ['', [Validators.required]]
    });

    this.formItens = this.fb.group({
      tituloItem: ['']
    });

    this.formTarefa.patchValue({
      id: this.tarefaFormVM.id,
      titulo: this.tarefaFormVM.titulo,
      prioridade: this.tarefaFormVM.prioridade
    });
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

  get itens(): ItemTarefaViewModel[] {
    return this.tarefaFormVM.itens
      .filter(a => a.status !== StatusItemTarefa.Removido);
  }

  public adicionarItem(): void {
    if (this.tituloItem?.value) {
      let item = new ItemTarefaViewModel();
      item.titulo = this.tituloItem.value;
      item.status = StatusItemTarefa.Adicionado;

      this.tarefaFormVM.itens.push(item);

      this.notificacao.aviso(`Item "${item.titulo}" adicionado com sucesso.`);

      this.formItens.reset();
    }
  }

  public removerItem(item: ItemTarefaViewModel): void {
    if (item) {
      this.tarefaFormVM.itens.forEach((x, index) => {
        if (x === item) {
          item.status = StatusItemTarefa.Removido;
          this.notificacao.aviso(`Item "${item.titulo}" removido com sucesso.`);
        }
      });
    }
  }

  public atualizarItem(item: ItemTarefaViewModel): void {
    if (item) {
      this.tarefaFormVM.itens.forEach((x) => {
        if (x === item)
          item.concluido = !item.concluido;
      })
    }
  }

  public gravar() {
    if (this.formTarefa.invalid) {
      this.notificacao.aviso('Por favor, preencha o formulário corretamente.');
      this.exibirMensagensValidacao(this.formTarefa);
      return;
    }

    this.tarefaFormVM = Object.assign({}, this.tarefaFormVM, this.formTarefa.value);


    this.tarefasService.editar(this.tarefaFormVM)
      .subscribe({
        next: (tarefaEditada) => this.processarSucesso(tarefaEditada),
        error: (erro) => this.processarFalha(erro)
      });
  }

  private processarSucesso(tarefa: FormsTarefaViewModel) {
    this.notificacao.sucesso(`Tarefa "${tarefa.titulo}" editada com sucesso!`);
    this.router.navigate(['/tarefas/listar']);
  }

  private processarFalha(erro: any) {
    this.notificacao.erro(erro);
  }
}
