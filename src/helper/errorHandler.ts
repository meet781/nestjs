import { ConflictException } from '@nestjs/common';


import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


export function handlePrismaError(error: any): void {
    if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002' && error.meta?.target) {
          const field = error.meta.target as string[];
          if (field.includes('username')) {
            throw new ConflictException('Username already exists');
          }
          if (field.includes('email')) {
            throw new ConflictException('Email already exists');
          }
          // Handle other unique constraint violations if needed
        }
      }
      // Handle other database errors
      throw new ConflictException('Internal error');
}


