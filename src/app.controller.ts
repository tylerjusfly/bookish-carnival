import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalauthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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