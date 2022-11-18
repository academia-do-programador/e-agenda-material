import { ListarContatoViewModel } from "src/app/contatos/view-models/listar-contato.view-model";
import { TipoLocalizacaoCompromissoEnum } from "./tipo-localizacao-compromisso.enum";

export class VisualizarCompromissoViewModel {
  id: string;
  assunto: string;
  tipoLocal: TipoLocalizacaoCompromissoEnum;
  local?: string;
  link?: string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
  contato?: ListarContatoViewModel;
}
