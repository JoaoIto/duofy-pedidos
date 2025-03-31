import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Roles } from './Roles';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: Roles.USER })
  role: Roles;
}
