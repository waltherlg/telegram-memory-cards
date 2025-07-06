import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../domain/dto/user.domain.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private userWebModel: Model<UserDocument>,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<string> {
    const newUser = new this.userWebModel(userDto);
    await newUser.save();
    return newUser._id.toString();
  }
}
