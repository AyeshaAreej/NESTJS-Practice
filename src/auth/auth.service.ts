import { Injectable, Post,Req } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
// Business logic here
@Injectable()
export class AuthService {
  //Dependency Injection
  constructor(private prsima: PrismaService) {

  }
  @Post('signin')
  signin() {
    return 'I am signed in';
  }

  @Post('signup')
  signup() {
    return 'I am signed up';
  }
}
