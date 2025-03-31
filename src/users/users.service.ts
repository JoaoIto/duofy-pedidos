// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import * as bcrypt from 'bcrypt';
// import { User } from './user.entity';
// import { Roles } from './Roles';
//
// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User)
//     private userRepository: Repository<User>,
//   ) {}
//
//   // async createUser(username: string, password: string): Promise<User> {
//   //   const hashedPassword = await bcrypt.hash(password, 10);
//   //   const user = new User();
//   //   user.username = username;
//   //   user.password = hashedPassword;
//   //   user.role = Roles.USER;
//   //
//   //   return await this.userRepository.save(user);
//   // }
//
//   // async findUserByUsername(username: string): Promise<User | undefined> {
//   //   return this.userRepository.findOne({ where: { username } });
//   // }
//
//   async validateUserPassword(
//     username: string,
//     password: string,
//   ): Promise<boolean> {
//     const user = await this.findUserByUsername(username);
//     if (!user) {
//       return false;
//     }
//     return user.validatePassword(password);
//   }
// }
