import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/staticStore/schemas/user.schema';


@Module({
  imports : [
    MongooseModule.forFeature([{name :'userSchema', schema : userSchema}])
  ],
  providers : [UsersService],
  exports : [UsersService]
})
export class UsersModule {}
