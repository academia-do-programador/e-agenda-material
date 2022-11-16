import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { FormsTarefaViewModel } from "../view-models/forms-tarefa.view-model";
import { TarefasService } from "./tarefas.service";

@Injectable()
export class FormsTarefaResolver implements Resolve<FormsTarefaViewModel> {

  constructor(private tarefasService: TarefasService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<FormsTarefaViewModel> {
    return this.tarefasService.selecionarPorId(route.params['id']);
  }
}
