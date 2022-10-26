import { ForbiddenException, Injectable,} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { AuthDto } from './dto';


// Business logic here
@Injectable()
export class AuthService {
//Dependency Injection
   constructor(private prisma: PrismaService,
   private jwt: JwtService,
   private config:ConfigService) {}

     async signup(dto: AuthDto) {
   try{
        //  generate the password hash 
        const hash = await argon.hash(dto.password);
    
        // save the new user in db
       const user= await this.prisma.user.create({
        data: {
          email: dto.email,
          hash
          
        },
       });
      //  delete user.hash;
      // return saved user
      // return user;
      return this.signToken(user.id,user.email);
   } catch(error){
    if(error instanceof PrismaClientKnownRequestError){
        if(error.code==='P2002'){
          throw new ForbiddenException('Credentials taken') 
        }
    }
   }
  }

  async signin(dto:AuthDto) {
    // Find the user by email
    const user =
    await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // If user does not exist throw exception
    if(!user) throw new ForbiddenException('Credentials incorrect');     

    // compare password
    const pwMatches=await argon.verify(user.hash,dto.password)
    // if password incorrect throw exception
    if(!pwMatches) throw new ForbiddenException('Credentials incorrect');     

    return this.signToken(user.id,user.email);
  }

  // Function for generating token 
  async signToken(userId:number,email:string,):Promise<any>{
    const payload={
      sub:userId,
      email,
    };
    const secret=this.config.get('JWT_SECRET')
    
    const token= await this.jwt.signAsync(payload,{
      expiresIn:'15m',
      secret:secret,
    },);

    return {
      access_token:token, 
    }
  }
}
