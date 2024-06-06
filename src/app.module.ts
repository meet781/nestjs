import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ItemsController } from './items/items.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { ResponseService } from './helper/response.service';
import { UserService } from './user/user.service'

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [AppController, ItemsController , UserController],
  providers: [AppService, ResponseService, UserService], 
})
export class AppModule {}
