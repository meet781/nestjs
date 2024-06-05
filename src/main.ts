import { NestFactory , HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { PrismaClientExceptionFilter } from './helper/prisma-client-exception.filter'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())



  await app.listen(3000);
}
bootstrap();
