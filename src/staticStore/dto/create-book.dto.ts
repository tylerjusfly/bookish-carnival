import { Category } from "../schemas/book.schema";


export class CreateBookDTO {
  readonly title : string;
  readonly body : string;
  readonly status : Category
  readonly datePosted : string;
}