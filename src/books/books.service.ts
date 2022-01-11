import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { bookInterface } from 'src/staticStore/interfaces/book.interface';
import { CreateBookDTO } from 'src/staticStore/dto/create-book.dto';



@Injectable()
export class BooksService {
  constructor(@InjectModel('bookSchema') private readonly bookModel : Model<bookInterface>) {}

  async createBook(CreateBookDTO : CreateBookDTO) :Promise<bookInterface> {
    const newbook = new this.bookModel(CreateBookDTO);
    return await newbook.save()
  }

  async findOne(bookId : number) :Promise<bookInterface> {
    const books = await this.bookModel.findById(bookId).exec()
    return books
  }

  async findAll() : Promise<bookInterface[]> {
      const books = await this.bookModel.find().exec()
      if(books){
        throw new NotFoundException("No Books Has Been Written Yet At This Time.")
      }
      return books;
  }

  async delete(bookId : number) : Promise<bookInterface> {
    return await this.bookModel.findByIdAndDelete(bookId)

  }
}
