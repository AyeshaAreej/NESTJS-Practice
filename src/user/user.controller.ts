import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator';
import {User} from '@prisma/client';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
 
  @Get('me')
  getMe(
  @GetUser()  user: User,
  @GetUser('email')  email: string,) {
    console.log({
      email,
    })
    return user;
  }
  @Patch()
  editUser() {}
}