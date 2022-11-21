import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { delay, Observable } from 'rxjs';
import { CategoriaService } from '../services/categoria.service';
import { ListarCategoriaViewModel } from '../view-models/listar-categoria.view-model';

@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.component.html',
  styles: [
  ]
})
export class ListarCategoriaComponent implements OnInit {
  categorias$: Observable<ListarCategoriaViewModel[]>;
  colunasExibidas = ['Título', 'Ações'];

  constructor(
    titulo: Title,
    private categoriaService: CategoriaService
  ) {
    titulo.setTitle('Categorias - e-Agenda')
  }

  ngOnInit(): void {
    this.categorias$ = this.categoriaService.selecionarTodos()
      .pipe(delay(3000));
  }
}
