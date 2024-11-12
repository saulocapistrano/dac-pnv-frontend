export interface Contato {
  idContato: number;
  email: string;
  telefone1: string;
  telefone2?: string;
  telefone3?: string;
}

export interface Pessoa {
  idPessoa: number;
  nomePessoa: string;
  sobrenomePessoa: string;
  tipoPessoa: string;
  contatoPessoa: Contato;
}

export interface Cliente {
  idCliente: number;
  idClientePessoa: Pessoa;
  dataRegistro: Date;
  criadoPorPessoa?: Pessoa;
}
