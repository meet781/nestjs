import { Controller, Post, Body, Get , Param } from '@nestjs/common';
import { UserService } from './user.service';
import { users } from '@prisma/client'; // Adjust import path if needed
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { ResponseService } from '../helper/response.service';
import { Response } from 'express';
import { get } from 'http';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService ,
    private readonly responseService : ResponseService) { }

  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto): Promise<users> {
    return this.userService.createUser(createUserDto);
  }

  @Get('users')
  getAllUsers() {
    return this.userService.getAllUsers();
}

 @Get(':id')
  getUserById(@Param('id') id: string)  {
    return this.userService.getUserById(Number(id))
}
}