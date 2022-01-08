import { Injectable, HttpException } from '@nestjs/common';
import {BOOKS} from '../mocks/books.mock'

@Injectable()
export class BooksService {
  books = BOOKS

  async getbooks() :Promise<any[]> {
    return this.books
  }

  getbook(bookID : number) :Promise<any> {
    let id = Number(bookID)
    return new Promise( resolve => {
      const book = this.books.find(book => book.id === id);
      if(!book){
        throw new HttpException('Book does not exist!', 404);
      }
      resolve(book)

    });
  }

  addbook(book : any) : Promise<any> {
    return new Promise(resolve => {
      this.books.push(book)
      resolve(this.books)

    });
  }

  delete(bookID : number) : Promise<any> {
    let id = Number(bookID)
    return new Promise( resolve => {
      let index = this.books.findIndex( book => book.id === id);
      if (index === -1){
        throw new HttpException('Book does not exist', 404)
      }
      this.books.splice(1, index);
      resolve(this.books);
    })
  }
}
