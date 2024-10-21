import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,

  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userRepository.create({
        ...createUserDto,
        password: bcrypt.hashSync(createUserDto.password, 12),
      })
      const user = await this.userRepository.save(newUser)
      const access_token = this.jwtService.sign({
        id: user.id
      });
      return {
        user,
        access_token
      }

    } catch (error) {
      console.log(error);

      throw new BadRequestException("someting went wrong")
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(userFind: CreateUserDto) {
    const user = await this.userRepository.findOneBy({ email: userFind.email })
    if (user && bcrypt.compareSync(userFind.password, user.password)) {
      const access_token = this.jwtService.sign({
        id: user.id
      });
      return {
        user: user,
        access_token
      }
    } else {
      throw new UnauthorizedException('Invalid credentials')
    }
  }


  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
