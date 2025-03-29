import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Status } from './Status';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @Column()
  status: Status; // 'pendente' | 'processando' | 'concluído'

  @CreateDateColumn()
  criadoEm: Date;
}
