import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { PrismaClientExceptionFilter } from './helper/prisma-client-exception.filter'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
