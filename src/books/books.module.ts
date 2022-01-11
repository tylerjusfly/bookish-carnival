import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { bookSchema } from 'src/staticStore/schemas/book.schema';

@Module({
  imports : [
    MongooseModule.forFeature([{name : 'bookSchema', schema : bookSchema}])
  ],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
