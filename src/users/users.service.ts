import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userInterface } from 'src/staticStore/interfaces/user.interface';
import { CreateUserDTO } from 'src/staticStore/dto/create-user.dto';


@Injectable()
export class UsersService {
  constructor(@InjectModel('userSchema') private usersModel : Model<userInterface> ){}
  
  async createUser(CreateUserDTO : CreateUserDTO){
    const {username} = CreateUserDTO
    const user = await this.usersModel.findOne({username})
    if(user){ throw new HttpException("user Already Exists", HttpStatus.BAD_REQUEST);}
    const createdUser = new this.usersModel(CreateUserDTO)
    return await createdUser.save()

  }

  async findOne(username : String) : Promise <userInterface | undefined>{
    return this.usersModel.findOne({username})
  }
}

