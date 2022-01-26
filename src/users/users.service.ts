import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from 'src/staticStore/dto/create-user.dto';
import {User, UserDocument} from 'src/staticStore/schemas/user.schema'
import * as bcrypt from 'bcrypt'


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private usersModel : Model<UserDocument> ){}
  
  async createUser(DTO : CreateUserDTO){
    // this is eqivalent to const username = CreateUserDTO.email
    const {username} = DTO
    const user = await this.usersModel.findOne({username})
    if(user){ throw new HttpException("user Already Exists", HttpStatus.BAD_REQUEST);}
    const createdUser = new this.usersModel(DTO, bcrypt.hashSync(DTO.password, 10))

    return await createdUser.save()

  }

  // function for finding username in DB
  async findOne(username : String) : Promise <any>{
    return await this.usersModel.findOne({username})
  }

  async findById(id :any) : Promise<any>{
    return await this.usersModel.findById(id)
  }
}

