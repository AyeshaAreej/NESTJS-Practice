import { Injectable, Post,Req } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

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
  signup(dto: AuthDto) {
    return 'I am signed up';
  }
}
