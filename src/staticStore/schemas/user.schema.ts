import * as mongoose from 'mongoose'

export const userSchema = new mongoose.Schema({
  name : String,
  username : String,
  password : String
})