import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['descricao'],
    },
  })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 200, description: 'Login feito com sucesso!' })
  async login(@Body() req: User) {
    return this.authService.login(req.username, req.password);
  }

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.authService.register(username, password);
  }
}
