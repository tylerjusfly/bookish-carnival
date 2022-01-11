import { Injectable } from '@nestjs/common';
import { userInterface } from 'src/staticStore/interfaces/user.interface';


@Injectable()
export class UsersService {
  private readonly users : userInterface[] = [
    {
      id : 1,
      name : "tylerjusfly",
      username : "tyler",
      password : "ladygaga"
    },
    {
      id : 2,
      name : "fauzy",
      username : "fauxy",
      password : "ladygaga"
    },
  ];

  async findOne(username : String) : Promise <userInterface | undefined>{
    return this.users.find(user => user.username === username)
  }
}

