import { Module } from '@nestjs/common';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedido.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { PedidoSchema } from './pedido.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido]), // PostgreSQL
    MongooseModule.forFeature([{ name: 'Pedido', schema: PedidoSchema }]), // MongoDB
  ],
  providers: [PedidosService],
  controllers: [PedidosController],
})
export class PedidosModule {}
