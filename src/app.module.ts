import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import config from './config/mongodb'
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    BooksModule,
    UsersModule,
    MongooseModule.forRoot(config.mongoURI),
    ConfigModule.forRoot(),
    AuthModule,
  ],
  
  controllers: [AppController],
  providers: [AppService, JwtAuthGuard]
})
export class AppModule {}