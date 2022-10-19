import { Injectable, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

// Business logic here
@Injectable()
export class AuthService {
//Dependency Injection
   constructor(private prisma: PrismaService) {}

     async signup(dto: AuthDto) {
       //  generate the password hash 
       const hash = await argon.hash(dto.password);
    
        // save the new user in db
       const user= await this.prisma.user.create({
        data: {
          email: dto.email,
          hash
          
        },
       });
       delete user.hash;
      // return saved user
      return user;
  }

  signin() {
    return 'I am signed in';
  }
}
