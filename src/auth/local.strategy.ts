// Implementing local authentication strategy
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(private authService : AuthService){
    // there are no configuration options, so our constructor simply calls super()
    super()
  }

  async validate(username :string, password : string){
    // passport checks if credentials are valid
    const user = await this.authService.ValidateUser(username, password)
    if(!user) throw new UnauthorizedException();
    // thereby creating a user object in the request object
    return user;
  }
}