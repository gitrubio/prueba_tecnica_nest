import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly UserService: UsersService,
  ) { }

  async register(createAuthDto: CreateUserDto) {
       const user = await this.UserService.create(createAuthDto);
       return user
  }

  async login( loginUSer: CreateUserDto) {
      return await this.UserService.findOne(loginUSer);   
  }

  
}
