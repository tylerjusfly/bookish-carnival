import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import {Document, Schema as MSchema} from 'mongoose'
import { User, } from "./user.schema";

export enum Category {
  soldout = 'soldout',
  available = 'available'
}

export type BookDocument = Document & Book

@Schema()
export class Book {
  @Prop({required: true})
  title : String;

  @Prop({required : true})
  body : String;

  @Prop({type: MSchema.Types.ObjectId, ref: "User", required: true})
  author : User;

  @Prop({ enum : ['soldout', 'available'], default : 'available'})
  status : Category

  @Prop()
  datePosted : String;

}

export const BookSchema = SchemaFactory.createForClass(Book)
