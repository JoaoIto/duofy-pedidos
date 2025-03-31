import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './pedido.entity';
import { CriarPedidoDto } from './dto/createPedido.dto';
import { User } from '../users/user.entity';
import { Roles } from '../users/Roles';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PedidoDocument } from './pedido.schema';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido) private pedidosRepository: Repository<Pedido>, // PostgreSQL
    @InjectModel('Pedido') private pedidoModel: Model<PedidoDocument>, // MongoDB
  ) {}

  async create(data: CriarPedidoDto): Promise<Pedido> {
    // Salvar no PostgreSQL
    const pedidoPostgres = this.pedidosRepository.create(data);
    await this.pedidosRepository.save(pedidoPostgres);

    // Salvar no MongoDB
    const pedidoMongo = new this.pedidoModel(data);
    await pedidoMongo.save();

    return pedidoPostgres; // Retorna o pedido do PostgreSQL
  }

  async findAll(): Promise<any> {
    const pedidosPostgres = await this.pedidosRepository.find();
    const pedidosMongo = await this.pedidoModel.find();

    return {
      postgres: pedidosPostgres,
      mongo: pedidosMongo,
    };
  }

  async editarPedido(
    id: number,
    dto: Partial<CriarPedidoDto>,
  ): Promise<Pedido> {
    const pedido = await this.pedidosRepository.findOne({ where: { id } });

    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    }

    if (!pedido.active) {
      throw new BadRequestException(
        `Pedido com ID ${id} está desativado e não pode ser editado`,
      );
    }

    Object.assign(pedido, dto);
    return this.pedidosRepository.save(pedido);
  }

  async getPedidoById(id: number): Promise<Pedido> {
    const pedido = await this.pedidosRepository.findOne({
      where: { id, active: true },
    });

    if (!pedido) {
      throw new NotFoundException(
        `Pedido com ID ${id} não encontrado ou está desativado`,
      );
    }

    return pedido;
  }

  async deletePedido(id: number, user: User): Promise<{ message: string }> {
    const pedido = await this.pedidosRepository.findOne({ where: { id } });

    if (user.role !== Roles.ADMIN) {
      throw new ForbiddenException(
        'Apenas administradores podem deletar pedidos.',
      );
    }

    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    }

    if (pedido.active) {
      throw new BadRequestException(
        `Pedido com ID ${id} ainda está ativo. Desative antes de excluir.`,
      );
    }

    await this.pedidosRepository.delete(id);
    return { message: `Pedido com ID ${id} deletado com sucesso` };
  }

  async desativarPedido(id: number): Promise<{ message: string }> {
    const pedido = await this.pedidosRepository.findOne({ where: { id } });

    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    }

    if (!pedido.active) {
      throw new BadRequestException(`Pedido com ID ${id} já está desativado`);
    }

    pedido.active = false;
    await this.pedidosRepository.save(pedido);
    return { message: `Pedido com ID ${id} foi desativado` };
  }
}
