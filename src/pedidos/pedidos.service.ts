import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './pedido.entity';
import { CriarPedidoDto } from './dto/createPedido.dto';
import { Status } from './Status';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidosRepository: Repository<Pedido>,
  ) {}

  async criarPedido(dto: CriarPedidoDto): Promise<Pedido> {
    const novoPedido = this.pedidosRepository.create({
      descricao: dto.descricao,
      status: Status.PENDENTE,
    });
    return this.pedidosRepository.save(novoPedido);
  }

  async listarPedidos(): Promise<Pedido[]> {
    return this.pedidosRepository.find();
  }

  async obterPedidoPorId(id: number): Promise<Pedido> {
    const pedido = this.pedidosRepository.findOne({ where: { id } });
    if (pedido) {
      return pedido;
    } else {
      return 'Pedido não encontrado!';
    }
  }
}
