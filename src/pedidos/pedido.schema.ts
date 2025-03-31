import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Status } from './Status';

export type PedidoDocument = Pedido & Document;

@Schema()
export class Pedido {
  @Prop({ required: true })
  descricao: string;

  @Prop({ default: Status.PENDENTE })
  status: string;

  @Prop({ default: Date.now })
  criadoEm: Date;

  @Prop({ default: true })
  active: boolean;
}

export const PedidoSchema = SchemaFactory.createForClass(Pedido);
