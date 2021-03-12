import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UserType } from './users.type';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './users.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}
  async create(account: UserType): Promise<UserType> {
    // Hashing password
    const hashed = await bcrypt.hash(account.password, 12);
    const user = new this.usersModel({
      username: account.username,
      password: hashed,
    });
    return user.save();
  }
  async findOne(username: string): Promise<UserType | undefined> {
    return this.usersModel.findOne({ username: username });
  }
}
