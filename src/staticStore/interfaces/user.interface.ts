import { Document } from "mongoose";


export interface userInterface extends Document {
  readonly name : String;
  readonly username : String
  readonly password : String
}