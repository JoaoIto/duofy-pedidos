import { Injectable, NotFoundException } from '@nestjs/common';
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

  async editarPedido(
    id: number,
    dto: Partial<CriarPedidoDto>,
  ): Promise<Pedido> {
    const pedido = await this.pedidosRepository.findOne({ where: { id } });

    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    }

    Object.assign(pedido, dto);

    return this.pedidosRepository.save(pedido);
  }

  async listarPedidos(): Promise<Pedido[]> {
    return this.pedidosRepository.find();
  }

  async getPedidoById(id: number): Promise<Pedido> {
    const pedido = await this.pedidosRepository.findOne({ where: { id } });
    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    }
    return pedido;
  }

  async deletePedido(id: number): Promise<{ message: string }> {
    const pedido = await this.pedidosRepository.findOne({ where: { id } });

    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    }

    await this.pedidosRepository.delete(id);

    return { message: `Pedido com ID ${id} deletado com sucesso` };
  }
}
