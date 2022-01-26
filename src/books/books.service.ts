import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBookDTO } from 'src/staticStore/dto/create-book.dto';
import {Book, BookDocument} from 'src/staticStore/schemas/book.schema'
import { UsersService } from 'src/users/users.service';



@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel : Model<BookDocument>,
    private readonly userService : UsersService
  ) {}

  async createBook(DTO : CreateBookDTO, userid: string) {
    const user = await this.userService.findById(userid)
    if (!user) throw new NotFoundException('Account with given ID not found');
    const newbook = new this.bookModel();
    newbook.title = DTO.title;
    newbook.body = DTO.body;
    newbook.author = user;
    newbook.status = DTO.status
    newbook.datePosted = DTO.datePosted
    return await newbook.save()
  }

  async findOne(bookId : number) :Promise<BookDocument> {
    const books = await this.bookModel.findById(bookId).exec()
    return books
  }

  async findAll() : Promise<BookDocument[]> {
      const books = await this.bookModel.find().exec()
      if(!books){
        throw new NotFoundException("No Books Has Been Written Yet At This Time.")
      }
      return books;
  }

  async delete(bookId : number) : Promise<BookDocument> {
    return await this.bookModel.findByIdAndDelete(bookId)

  }
}
