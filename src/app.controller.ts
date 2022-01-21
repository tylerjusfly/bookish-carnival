import { Controller, Get, Post, Req, UseGuards, Res, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { CreateUserDTO } from './staticStore/dto/create-user.dto';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService : UsersService,
    private authService : AuthService
    ) {}

    @Post('/signup')
    async createUser(@Res() res, @Body() CreateUserDTO : CreateUserDTO){
      const newUser = await this.userService.createUser(CreateUserDTO)
      return res.status(HttpStatus.CREATED).json({
        message : 'a new user has been created',
        user : newUser
      })
    }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req) : any {
    // returning a JWT for use in subsequent calls to protected API endpoints.
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


}