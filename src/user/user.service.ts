// src/user.service.ts
import { Injectable ,NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ResponseService } from 'src/helper/response.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { users } from '@prisma/client';
import { hash } from 'bcrypt';
import { handlePrismaError } from 'src/helper/errorHandler';



@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private responseService: ResponseService,
  ) { }

  async userExistsByEmail( email : string): Promise<boolean> {
    const user = await this.prisma.users.findUnique({
      where: {
        email
      },
    });
    return !!user;
  }

  async userExistsByUsername(username: string): Promise<boolean> {
    const user = await this.prisma.users.findUnique({
      where: {
        username,
      },
    });
    return !!user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<users> {
    try {
      if (await this.userExistsByEmail(createUserDto.email)) {
        this.responseService.send('Email already exists', 'BAD_REQUEST');
      }

      if (await this.userExistsByUsername(createUserDto.username)) {
        this.responseService.send('Username already exists', 'BAD_REQUEST');
      }

      const newUser = await this.prisma.users.create({
        data: {
          username: createUserDto.username,
          email: createUserDto.email,
          name: createUserDto.name,
          password: await hash(createUserDto.password, 10)
        }
      });

      this.responseService.send(newUser, 'OK', 'new user created');
      return newUser;
    } catch (error) {
      this.responseService.send(error.message, 'FAILURE');
      handlePrismaError(error)
    }
  }
  async getAllUsers(): Promise<any[]> {
    try {
      return await this.prisma.users.findMany();
    } catch (error) {
      throw new NotFoundException('Failed to fetch users');
    }
  }

  async getUserById(id: number) {
    try {
      const user = await this.prisma.users.findFirst({
        where: {
          id,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new NotFoundException('Failed to fetch user');
    }
  }
}



