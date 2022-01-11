import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import config from './config/mongodb'

@Module({
  imports: [
    BooksModule,
    UsersModule,
    MongooseModule.forRoot(config.mongoURI),
    AuthModule
  ],
  
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}