import { IsEmail, IsNotEmpty, IsString } from "class-validator";

// Applying a class validator
export class AuthDto {

@IsEmail()
@IsNotEmpty()    
email: string;

@IsString()
@IsNotEmpty() 
password: string;
}