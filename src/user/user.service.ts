import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ResponseService } from 'src/helper/response.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { users } from '@prisma/client';
import { hash } from 'bcrypt';
import PrismaErrorHandler from 'src/helper/errorHandler';
import { UpdateUsertDto } from './dto/user-update.dto';



@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private responseService: ResponseService,
  ) { }

  async userExistsByEmail(email: string): Promise<users | null> {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          email,
        },
      });
      return user;
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async userExistsByUsername(username: string): Promise<users | null> {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          username,
        },
      });
      return user;
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<users> {
    try {
      const userByEmail = await this.userExistsByEmail(createUserDto.email);
      if (userByEmail) {
        throw new BadRequestException('User already exists');
      }

      const userByUsername = await this.userExistsByUsername(createUserDto.username);
      if (userByUsername) {
        throw new BadRequestException('User already exists');
      }

      const newUser = await this.prisma.users.create({
        data: {
          username: createUserDto.username,
          email: createUserDto.email,
          name: createUserDto.name,
          password: await hash(createUserDto.password, 10),
        },
      });

      return newUser;
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async getAllUsers(): Promise<any[]> {
    try {
      return await this.prisma.users.findMany();
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async getUserById(id: number):Promise<users> {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          id,
        },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }
  async updateUser(id: number, updateUserDto: UpdateUsertDto): Promise<users>{
    try {
      const userExist = await this.getUserById(id)

      if (!userExist) {
        throw new NotFoundException('User not found');
      }
      const updateUser = await this.prisma.users.update({
        where: { id },
        data: {
          ...updateUserDto,
          ...(updateUserDto.password && {
            password: await hash(updateUserDto.password, 10),
          })
        }
      })
      return  updateUser
     }catch(error) {
      PrismaErrorHandler.handle(error)
    }
  } 
}

