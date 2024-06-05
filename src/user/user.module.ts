import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ResponseService } from 'src/helper/response.service';
;

@Module({
  providers: [UserService , ResponseService ] ,
  controllers: [UserController]
})

export class UserModule {}
