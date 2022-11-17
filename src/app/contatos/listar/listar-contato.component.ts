import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { map, Observable, shareReplay } from 'rxjs';
import { ContatoService } from '../services/contato.service';
import { ListarContatoViewModel } from '../view-models/listar-contato.view-model';

@Component({
  selector: 'app-listar-contato',
  templateUrl: './listar-contato.component.html',
  styles: [`
    mat-header-cell, mat-cell {
      justify-content: center;
    }
  `]
})
export class ListarContatoComponent implements OnInit {
  contatos$: Observable<ListarContatoViewModel[]>;
  colunasExibidas = ['Nome', 'Telefone', 'Cargo', 'Ações'];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    titulo: Title,
    private contatoService: ContatoService,
    private breakpointObserver: BreakpointObserver,
  ) {
    titulo.setTitle('Contatos - e-Agenda')
  }

  ngOnInit(): void {
    this.contatos$ = this.contatoService.selecionarTodos();
  }

}
