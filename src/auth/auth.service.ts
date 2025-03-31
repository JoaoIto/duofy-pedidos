import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/user.entity';
import { UserMongo } from '../users/user.schema';
import * as bcrypt from 'bcrypt';
import logger from '../utils/logger';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectModel(UserMongo.name)
    private readonly userMongoModel: Model<UserMongo>,

    private readonly jwtService: JwtService,
  ) {}

  async register(
    username: string,
    password: string,
  ): Promise<{ message: string }> {
    logger.debug(`Tentando registrar usuário: ${username}`);

    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    const existingUserMongo = await this.userMongoModel.findOne({ username });

    if (existingUser || existingUserMongo) {
      logger.warn(`Usuário ${username} já existe`);
      throw new BadRequestException('Usuário já existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Salva no PostgreSQL
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    await this.userRepository.save(user);

    // Salva no MongoDB
    const userMongo = new this.userMongoModel({
      username,
      password: hashedPassword,
    });
    await userMongo.save();

    logger.info(`Usuário ${username} registrado com sucesso`);

    return { message: 'Usuário registrado com sucesso' };
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    logger.debug(`Tentativa de login para usuário: ${username}`);

    const user = await this.userRepository.findOne({ where: { username } });
    const userMongo = await this.userMongoModel.findOne({ username });

    if (!user && !userMongo) {
      logger.warn(`Usuário ${username} não encontrado`);
      throw new NotFoundException('Credenciais inválidas');
    }

    const validPassword = user
      ? await bcrypt.compare(password, user.password)
      : userMongo
        ? await bcrypt.compare(password, userMongo.password)
        : false;

    if (!validPassword) {
      logger.error(`Senha incorreta para o usuário ${username}`);
      throw new NotFoundException('Credenciais inválidas');
    }

    const payload = { username };
    const access_token = this.jwtService.sign(payload);

    logger.info(`Usuário ${username} autenticado com sucesso`);

    return { access_token };
  }
}
