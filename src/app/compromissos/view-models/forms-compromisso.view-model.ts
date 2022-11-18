import { Timestamp } from "rxjs";
import { TipoLocalizacaoCompromissoEnum } from "./tipo-localizacao-compromisso.enum";

export class FormsCompromissoViewModel {
  id: string;
  assunto: string;
  tipoLocal: TipoLocalizacaoCompromissoEnum;
  local?: string;
  link?: string;
  data: Date;
  horaInicio: Timestamp<string>;
  horaTermino: Timestamp<string>;
  contatoId?: string;
}
