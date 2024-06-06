import { Prisma } from '@prisma/client';
import { ConflictException, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';

class PrismaErrorHandler {
  static handle(error: any): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          throw new ConflictException('Unique constraint failed on the field(s): ' + this.extractFieldsFromMeta(error.meta));
        case 'P2025':
          throw new NotFoundException('Record not found.');
        // Add more cases for other known error codes
        default:
          throw new InternalServerErrorException('An unknown error occurred: ' + error.message);
      }
    } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      throw new InternalServerErrorException('An unknown error occurred: ' + error.message);
    } else if (error instanceof Prisma.PrismaClientRustPanicError) {
      throw new InternalServerErrorException('A Rust panic occurred in Prisma Client: ' + error.message);
    } else if (error instanceof Prisma.PrismaClientInitializationError) {
      throw new InternalServerErrorException('An error occurred during Prisma Client initialization: ' + error.message);
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      throw new InternalServerErrorException('Validation error: ' + error.message);
    } else {
      throw error;
    }
  }

  private static extractFieldsFromMeta(meta: any): string {
    if (!meta || !meta.target) return '';
    return Array.isArray(meta.target) ? meta.target.join(', ') : meta.target;
  }
}

export default PrismaErrorHandler;
