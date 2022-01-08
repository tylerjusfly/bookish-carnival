import { Controller, Get, Param, Delete} from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly BookService : BooksService){}

  @Get()
  async getbooks() : Promise<any[]>{
   const books = this.BookService.getbooks()
   return books
  }

  @Get(':id')
  getbook(@Param('id') id) : Promise<any> {
    return this.BookService.getbook(id)
  }

  @Delete(':id')
  deleteBook(@Param('id') id) :Promise<any>{
    return this.BookService.delete(id)

  }

}
