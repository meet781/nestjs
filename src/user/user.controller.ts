import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { users } from '@prisma/client'; // Adjust import path if needed
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { ResponseService } from '../helper/response.service';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService ,
    private readonly responseService : ResponseService) { }

  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto): Promise<users> {
    return this.userService.createUser(createUserDto);
  }
}
