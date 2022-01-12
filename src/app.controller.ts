import { Controller, Get, Post, Req, UseGuards, Res, Body, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalauthGuard } from './auth/local-auth.guard';
import { UsersService } from './users/users.service';
import { CreateUserDTO } from './staticStore/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService : UsersService
    ) {}

    @Post('/signup')
    async createUser(@Res() res, @Body() CreateUserDTO : CreateUserDTO){
      const newUser = await this.userService.createUser(CreateUserDTO)
      return res.status(HttpStatus.CREATED).json({
        message : 'a new user has been created',
        user : newUser
      })
    }

  @UseGuards(LocalauthGuard)
  @Post('/login')
  login(@Req() req) :any {
    return req.user ;
  }


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}