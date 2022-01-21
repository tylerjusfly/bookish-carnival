import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from 'src/staticStore/schemas/book.schema';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports : [
    AuthModule,
    MongooseModule.forFeature([{name : Book.name, schema : BookSchema}])
  ],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
