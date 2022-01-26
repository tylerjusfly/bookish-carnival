import { Controller, Get, Param, Delete, HttpException, Post, Body, Res, Req, HttpStatus, NotFoundException, Put, UseGuards} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from 'src/staticStore/dto/create-book.dto';
import { ValidateObjectId } from 'src/staticStore/shared/pipes/validate-object-id.pipes';
import { BookDocument } from 'src/staticStore/schemas/book.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Usr } from 'src/users/user.decorator';

@Controller('books')
export class BooksController {
  constructor(private BookService : BooksService){}

  @UseGuards(JwtAuthGuard)
  @Post('/write')
  async createBook(@Usr() user: any, @Res() res, @Body() CreateBookDTO : CreateBookDTO)  {
    
    const newBook = await this.BookService.createBook(CreateBookDTO, user.userId)
    return res.status(HttpStatus.OK).json({
      message : 'Your book has successfully been published!',
      book : newBook
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findbooks(@Res() res) {
   const books = await this.BookService.findAll()
  
     return res.status(HttpStatus.OK).json(books)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Res() res, @Param('id', new ValidateObjectId()) id : number) : Promise<BookDocument> {
    const book = await this.BookService.findOne(id)
    if(!book){
      return res.status(HttpStatus.NOT_FOUND).json("this Book does not exist")
    }
    return res.status(HttpStatus.OK).json(book)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteBook(@Res() res, @Param('id', new ValidateObjectId() ) id : number) {
    const deletedPost = await this.BookService.delete(id)
    if(!deletedPost){
      return res.status(HttpStatus.NOT_FOUND).json({message : `Post with ${id} does not exist`})
    }
    return res.status(HttpStatus.OK).json({
      message : 'Post has been deleted',
      post : deletedPost
    })

  }

}
