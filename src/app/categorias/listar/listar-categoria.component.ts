import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { BaseCardListComponent } from 'src/app/shared/base-card-list/base-card-list.component';
import { CategoriaService } from '../services/categoria.service';
import { ListarCategoriaViewModel } from '../view-models/listar-categoria.view-model';

@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.component.html',
  styles: [
  ]
})
export class ListarCategoriaComponent
  extends BaseCardListComponent
  implements OnInit {
  categorias$: Observable<ListarCategoriaViewModel[]>;

  constructor(
    titulo: Title,
    breakpointObserver: BreakpointObserver,
    private categoriaService: CategoriaService
  ) {
    super(breakpointObserver);
    titulo.setTitle('Categorias - e-Agenda')
  }

  ngOnInit(): void {
    this.categorias$ = this.categoriaService.selecionarTodos();
  }
}
