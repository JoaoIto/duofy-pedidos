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
import { PedidoLog } from './logs/pedidoLog.schema';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido) private pedidosRepository: Repository<Pedido>, // PostgreSQL
    @InjectModel('Pedido') private pedidoModel: Model<PedidoDocument>, // MongoDB
    @InjectModel('PedidoLog') private pedidoLog: Model<PedidoLog>, // MongoDB
  ) {}

  async create(data: CriarPedidoDto, user: User): Promise<Pedido> {
    const pedidoPostgres = this.pedidosRepository.create(data);
    await this.pedidosRepository.save(pedidoPostgres);

    const pedidoMongo = new this.pedidoModel({
      ...data,
      pedidoId: pedidoPostgres.id,
    });
    await pedidoMongo.save();

    await this.registrarLog(pedidoPostgres.id, 'CRIADO', user.username, data);
    return pedidoPostgres;
  }

  async findAll(user: User): Promise<any> {
    const pedidosPostgres = await this.pedidosRepository.find();
    const pedidosMongo = await this.pedidoModel.find();

    return { postgres: pedidosPostgres, mongo: pedidosMongo };
  }

  async editarPedido(
    id: number,
    dto: Partial<CriarPedidoDto>,
    user: User,
  ): Promise<Pedido> {
    const pedido = await this.pedidosRepository.findOne({ where: { id } });
    if (!pedido)
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    if (!pedido.active)
      throw new BadRequestException(`Pedido ${id} desativado`);

    Object.assign(pedido, dto);
    await this.pedidosRepository.save(pedido);

    await this.registrarLog(id, 'EDITADO', user.username, dto);
    return pedido;
  }

  async getPedidoById(id: number, user: User): Promise<Pedido> {
    const pedido = await this.pedidosRepository.findOne({
      where: { id, active: true },
    });
    if (!pedido)
      throw new NotFoundException(`Pedido ${id} não encontrado ou desativado`);

    await this.registrarLog(id, 'CONSULTADO', user.username);
    return pedido;
  }

  async deletePedido(id: number, user: User): Promise<{ message: string }> {
    const pedido = await this.pedidosRepository.findOne({ where: { id } });
    if (!pedido) throw new NotFoundException(`Pedido ${id} não encontrado`);
    if (user.role !== Roles.ADMIN)
      throw new ForbiddenException('Apenas admins podem deletar');
    if (pedido.active)
      throw new BadRequestException(`Pedido ${id} deve ser desativado antes`);

    await this.pedidosRepository.delete(id);
    await this.registrarLog(id, 'DELETADO', user.username);
    return { message: `Pedido ${id} deletado com sucesso` };
  }

  async desativarPedido(id: number, user: User): Promise<{ message: string }> {
    const pedido = await this.pedidosRepository.findOne({ where: { id } });
    if (!pedido) throw new NotFoundException(`Pedido ${id} não encontrado`);
    if (!pedido.active)
      throw new BadRequestException(`Pedido ${id} já desativado`);

    pedido.active = false;
    await this.pedidosRepository.save(pedido);
    await this.registrarLog(id, 'DESATIVADO', user.username);
    return { message: `Pedido ${id} foi desativado` };
  }

  async registrarLog(
    pedidoId: number | null,
    acao: string,
    usuario: string,
    detalhes?: any,
  ): Promise<void> {
    const log = new this.pedidoLog({
      pedidoId,
      acao,
      usuario,
      detalhes: detalhes ? JSON.stringify(detalhes) : undefined,
    });
    await log.save();
  }
}
