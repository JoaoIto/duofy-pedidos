import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CriarPedidoDto {
  @ApiProperty({
    example: 'Compra de materiais',
    description: 'Descrição do pedido',
  })
  @IsNotEmpty()
  @IsString()
  descricao: string;
}
