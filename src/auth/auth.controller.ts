import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signin')
    sign(){
      return this.authService.signin()
    }

    @Post('signup')
    signup(@Req() req: Request ){
      console.log(req)
        return this.authService.signup()
    }
}