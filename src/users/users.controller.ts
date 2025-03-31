// import { Controller, Post, Body, Get, Param } from '@nestjs/common';
// import { UserService } from './users.service';
// import { User } from './user.entity';
//
// @Controller('users')
// export class UsersController {
//   constructor(private readonly userService: UserService) {}
//
//   @Post('create')
//   async createUser(
//     @Body('username') username: string,
//     @Body('password') password: string,
//   ): Promise<User> {
//     return this.userService.createUser(username, password);
//   }
//
//   @Post('login')
//   async login(
//     @Body('username') username: string,
//     @Body('password') password: string,
//   ): Promise<{ message: string }> {
//     const isValid = await this.userService.validateUserPassword(
//       username,
//       password,
//     );
//     if (isValid) {
//       return { message: 'Login successful' };
//     } else {
//       return { message: 'Invalid username or password' };
//     }
//   }
//
//   @Get(':username')
//   async getUser(
//     @Param('username') username: string,
//   ): Promise<User | undefined> {
//     return this.userService.findUserByUsername(username);
//   }
// }
