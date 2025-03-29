import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CriarPedidoDto } from './dto/createPedido.dto';
import { Pedido } from './pedido.entity';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  criarPedido(@Body() dto: CriarPedidoDto): Promise<Pedido> {
    return this.pedidosService.criarPedido(dto);
  }

  @Put(':id')
  async editarPedido(
    @Param('id') id: number,
    @Body() dto: Partial<CriarPedidoDto>,
  ): Promise<Pedido> {
    return this.pedidosService.editarPedido(id, dto);
  }

  @Get()
  listarPedidos(): Promise<Pedido[]> {
    return this.pedidosService.listarPedidos();
  }

  @Get(':id')
  obterPedido(@Param('id') id: number): Promise<Pedido> {
    return this.pedidosService.getPedidoById(id);
  }

  @Delete('/delete/:id')
  deletePedido(@Param('id') id: number): Promise<{ message: string }> {
    return this.pedidosService.deletePedido(id);
  }

  @Delete(':id')
  desactivePedido(@Param('id') id: number): Promise<{ message: string }> {
    return this.pedidosService.desativarPedido(id);
  }
}
