import {Body, Controller, Post,} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthDto } from './dto';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signin')
    sign(){
      return this.authService.signin()
    }

    @Post('signup')
    signup(@Body() dto: AuthDto ){
        return this.authService.signup(dto)
    }
}