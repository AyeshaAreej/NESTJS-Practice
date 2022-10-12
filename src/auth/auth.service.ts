import { Injectable, Post } from '@nestjs/common';

// Business logic here
@Injectable({})
export class AuthService { 

    @Post('signin')
    signin() {
        return 'I am signed in'
    }

     @Post('signup')
    signup() {
        return 'I am signed up'
    }
}
