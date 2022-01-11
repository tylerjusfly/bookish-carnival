import { Document } from "mongoose";

export interface bookInterface extends Document{
  readonly title : String;
  readonly body : String;
  readonly author : String;
  readonly dataPosted : String;
}