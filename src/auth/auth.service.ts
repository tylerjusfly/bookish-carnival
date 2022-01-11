import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor( private UsersService : UsersService){}
  async validateUser (username : String, password : String) :Promise<any>{
    const user = await this.UsersService.findOne(username)

    if(user && user.password === password){
      const {password, username, ...rest} = user
      return user
    }
    return null
    
  }
}
