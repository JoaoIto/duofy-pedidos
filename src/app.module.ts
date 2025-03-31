import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosModule } from './pedidos/pedidos.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

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

    MongooseModule.forRoot('mongodb://localhost:27017/pedidos'),
    PedidosModule,
    AuthModule,
  ],
})
export class AppModule {}
