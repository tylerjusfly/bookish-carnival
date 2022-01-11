import { Injectable, UnauthorizedException } from "@nestjs/common"
import {PassportStrategy} from "@nestjs/passport"
import { Strategy } from "passport-local"
import {AuthService} from "./auth.service"

// Its a service provider so we add the injectable
@Injectable()
export class localStrategy extends PassportStrategy(Strategy){
  constructor( private authService : AuthService ){
    super(); // config strategy passed if needed
  }

  async validate(username : string, password :string) : Promise<any>{
    const user = await this.authService.validateUser(username, password)

    if(!user) {
      throw new UnauthorizedException()
    }
    return user
    
  }
}