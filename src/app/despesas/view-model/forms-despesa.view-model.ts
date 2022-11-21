import { CategoriaSelecionadaViewModel } from "./categoria-selecionada.view-model";
import { FormaPgtoDespesaEnum } from "./forma-pgto-despesa.enum";

export class FormsDespesaViewModel {
  id: string;
  descricao: string;
  valor: number;
  data: Date;
  formaPagamento: FormaPgtoDespesaEnum;
  categoriasSelecionadas: CategoriaSelecionadaViewModel[] = [];
}
