import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss'],
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];
  paginaAtual: number = 1;
  totalPaginas: number = 1;
  itensPorPagina: number = 10;
  totalItens: number = 0;
  paginas: number[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.clienteService.getClientesPaginados(this.paginaAtual, this.itensPorPagina).subscribe({
      next: (data) => {
        this.clientes = data.clientes;
        this.totalItens = data.totalItens;
        this.totalPaginas = Math.ceil(this.totalItens / this.itensPorPagina);
        this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
      },
      error: (err) => {
        console.error('Erro ao carregar clientes', err);
      },
    });
  }

  mudarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaAtual = pagina;
      this.carregarClientes();
    }
  }

  editarCliente(cliente: Cliente): void {

  }

  deletarCliente(cliente: Cliente): void {

  }
}
