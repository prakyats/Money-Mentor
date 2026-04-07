import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async me(userId: string) {
    return this.usersRepo.findProfileById(userId);
  }
}
