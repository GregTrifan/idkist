import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UserType } from './users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './users.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) { }
  /**
   * Create a user based on the received params
   * @param account 
   * @returns UserType | `{ status: 'Fail', reason: 'Username already existing' }`
   */
  async create(account: UserType): Promise<UserType | any> {
    // Hashing password
    const hashed = await bcrypt.hash(account.password, 12);
    // Create User

    const user = new this.usersModel({
      username: account.username,
      password: hashed,
    });
    try {
      await user.save();
      return { username: user.username, status: 'Success' };
    } catch {
      return { status: 'Fail', reason: 'Username already existing' };
    }
  }
  /**
   * Find an user based off his username
   * @param username 
   * @returns UserType | undefined
   */
  async findOne(username: string): Promise<UserType | undefined> {
    return this.usersModel.findOne({ username: username });
  }
}
