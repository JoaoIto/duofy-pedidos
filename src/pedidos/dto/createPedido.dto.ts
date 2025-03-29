import { IsNotEmpty, IsString } from 'class-validator';

export class CriarPedidoDto {
  @IsNotEmpty()
  @IsString()
  descricao: string;
}
