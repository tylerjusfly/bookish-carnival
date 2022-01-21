import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'; //Generating JWT service in the auth

@Injectable()
export class AuthService {
  constructor(
    private userService : UsersService,
    private jwtService : JwtService
  ){}

  // checking if user exists and if password match
  async ValidateUser(username : string, password : string) :Promise<any>{
    // getting findone function from userService to get username
    const user = await this.userService.findOne(username);
    if(user && user.password === password){

      return user
    }
    throw new BadRequestException('Username or password is incorrect')
  }

  // creating json web token
  async login(user :any){
    const payload = { username : user.username, sub : user._id}
    return { acessToken : this.jwtService.sign(payload)}
  }
}
