import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosModule } from './pedidos/pedidos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '2308',
      database: 'pedidos',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PedidosModule,
  ],
})
export class AppModule {}
