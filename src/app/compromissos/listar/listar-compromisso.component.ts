import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { CompromissoService } from '../services/compromisso.service';
import { ListarCompromissoViewModel } from '../view-models/listar-compromisso.view-model';

@Component({
  selector: 'app-listar-compromisso',
  templateUrl: './listar-compromisso.component.html',
  styles: [
  ]
})
export class ListarCompromissoComponent implements OnInit {
  compromissos$: Observable<ListarCompromissoViewModel[]>;
  colunasExibidas = ['Assunto', 'Data', 'Início', 'Término', 'Contato', 'Ações'];

  constructor(
    titulo: Title,
    private compromissoService: CompromissoService,
  ) {
    titulo.setTitle('Compromissos - e-Agenda')
  }

  ngOnInit(): void {
    this.compromissos$ = this.compromissoService.selecionarTodos();
  }

}
