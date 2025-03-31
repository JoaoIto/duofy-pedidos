import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CriarPedidoDto } from './dto/createPedido.dto';
import { Pedido } from './pedido.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { Role } from '../roles/roles.decorator';
import { User } from '../users/user.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  @ApiOperation({ summary: 'Criar um novo pedido' }) // Descrição no Swagger
  @ApiBody({ type: CriarPedidoDto })
  @ApiResponse({ status: 201, description: 'Pedido criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  criarPedido(@Body() dto: CriarPedidoDto, @Request() req): Promise<Pedido> {
    return this.pedidosService.create(dto, req.user);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put(':id')
  async editarPedido(
    @Param('id') id: number,
    @Body() dto: Partial<CriarPedidoDto>,
    @Request() req,
  ): Promise<Pedido> {
    return this.pedidosService.editarPedido(id, dto, req.user);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  listarPedidos(@Request() req): Promise<Pedido[]> {
    return this.pedidosService.findAll(req.user);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get(':id')
  obterPedido(@Param('id') id: number, @Request() req): Promise<Pedido> {
    return this.pedidosService.getPedidoById(id, req.user);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('admin')
  @Delete(':id')
  async deletePedido(@Param('id') id: number, @Request() req: User) {
    return this.pedidosService.deletePedido(id, req);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  desactivePedido(
    @Param('id') id: number,
    @Request() req,
  ): Promise<{ message: string }> {
    return this.pedidosService.desativarPedido(id, req.user);
  }
}
