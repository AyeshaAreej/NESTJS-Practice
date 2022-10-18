import { Global,Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Other way than exports and imports 
// add Global Decorator 
// After it the prisma service will be available in all the modules in app
@Global()
@Module({
  providers: [PrismaService],
  exports:[PrismaService],
})
export class PrismaModule {}
