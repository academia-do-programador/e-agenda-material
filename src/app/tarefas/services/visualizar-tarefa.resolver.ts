import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { VisualizarTarefaViewModel } from "../view-models/visualizar-tarefa.view-model";
import { TarefasService } from "./tarefas.service";

@Injectable()
export class VisualizarTarefaResolver implements Resolve<VisualizarTarefaViewModel> {

  constructor(private tarefaService: TarefasService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<VisualizarTarefaViewModel> {
    return this.tarefaService.selecionarTarefaCompletaPorId(route.params['id']);
  }
}
