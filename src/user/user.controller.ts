import { Controller, Post, Body, Get , Param ,Patch, ParseIntPipe  } from '@nestjs/common';
import { UserService } from './user.service';
import { users } from '@prisma/client'; // Adjust import path if needed
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { ResponseService } from '../helper/response.service';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService ,
    private readonly responseService : ResponseService) { }

    @Post('register')
    async registerUser(@Body() createUserDto: CreateUserDto): Promise<users> {
      try {
        return  await this.userService.createUser(createUserDto);
      } catch (error) {
        this.responseService.send('Failed to register user', 'FAILURE');
        throw error; // Rethrow the error to let NestJS handle it
      }
    }

  @Get('allUsers')
  getAllUsers() {
    return this.userService.getAllUsers();
}

 @Get(':id')
  getUserById(@Param('id') id: string):Promise<users>  {
    return this.userService.getUserById(Number(id))
  }

 
  
  
  
}