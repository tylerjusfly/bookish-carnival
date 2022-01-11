import * as mongoose from 'mongoose'

export const bookSchema = new mongoose.Schema({
  title : String,
  body : String,
  author : String,
  datePosted : String

})