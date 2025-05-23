import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/app/entities/user.entity';
import { Model } from 'mongoose';
import {
  CreateUserData,
  LoginReq,
  UserGetAndFilterType,
  UserListReaponse,
} from 'src/app/types/user.type';
import { v4 as uuidv4 } from 'uuid';
import { JsonWebTokenService } from 'shared/src';
import { hash_data, hash_verify } from 'common/src'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private UserModel: Model<User>,
    private readonly _jwtService: JsonWebTokenService
  ) { }

  async createUser(data: CreateUserData): Promise<string> {
    const { name, password, email } = data;
    try {
      const existingUser = await this.UserModel.findOne({ email });
      if (existingUser) throw new Error('Email already registered');
     const hashed_pass=hash_data(password)
      const result = await this.UserModel.create({
        userId: uuidv4(),
        email,
        name,
        password:hashed_pass,
        isDeleted: false,
        createdAt: new Date(),
      });
      return result.userId;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getUser(userId: string): Promise<User> {
    try {
      const user = await this.UserModel.findOne({ userId });
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getAllUsers(query: UserGetAndFilterType): Promise<UserListReaponse> {
    const { pageNumber, pageSize, search } = query;
    try {
      const skip = (pageNumber - 1) * pageSize;
      const filter = {
        isDeleted: false,
        ...(search && {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
          ],
        }),
      };

      const [data, count] = await Promise.all([
        this.UserModel.find(filter).skip(skip).limit(pageSize).exec(),
        this.UserModel.countDocuments(filter),
      ]);

      return { data, count };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deleteUser(userId: string): Promise<string> {
    try {
      const result = await this.UserModel.findOneAndUpdate(
        { userId },
        { isDeleted: true },
        { new: true },
      );
      if (!result) throw new NotFoundException('User not found');
      return 'User deleted successfully';
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async login(req: LoginReq): Promise<any> {
    const { email, password } = req;
    try {
      const user = await this.UserModel.findOne({ email,isDeleted: false });
      if (!user) throw new Error('Invalid User');
      if(!hash_verify(password,user.password)){
        throw new Error("Invalid Password")
      }
      const token = await this._jwtService.encrypt({
        data: { userId: user.userId },
        options: {
          expiresIn: '30d'
        }
      })
      return {
        token: token,
        userId: user.userId
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }


}
