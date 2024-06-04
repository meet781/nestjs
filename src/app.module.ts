import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ItemsController } from './items/items.controller';
import { ResponseService } from './helper/response.service';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from './user/user.module';




@Module({
  imports: [PrismaModule, UserModule],
  controllers: [AppController, ItemsController],
  providers: [ResponseService ,AppService],
})
export class AppModule {}
