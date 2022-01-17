import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop()
  name : String;

  @Prop()
  username : String;

  @Prop()
  password : String;


}

export const userSchema = SchemaFactory.createForClass(User)
 