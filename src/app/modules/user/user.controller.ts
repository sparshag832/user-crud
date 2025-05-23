import { Body, Controller, Delete, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, GetUsersDto, LoginDto } from './dto/user.dto';
import { handleException, ResponseInterceptor, successResponse, successResponseWithData } from 'common/src';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  // Create User
  @Post('create')
  async createUser(@Body() model: CreateUserDto) {
    try {
      const result = await this._userService.createUser(model);
      return successResponseWithData({ userId: result });
    } catch (err) {
      handleException(err);
    }
  }

  // Get Single User by User ID
  @Get('get/:userId')
  async getUser(@Param('userId') userId: string) {
    try {
      const result = await this._userService.getUser(userId);
      return successResponseWithData(result);
    } catch (err) {
      handleException(err);
    }
  }

  // Get All Users
  @Get('/get/all')
  async getAllUsers(@Query() model:GetUsersDto) {
    try {
      const result = await this._userService.getAllUsers(model);
      return successResponseWithData(result);
    } catch (err) {
      handleException(err);
    }
  }

  // Delete User by User ID
  @Delete('delete/:userId')
  async deleteUser(@Param('userId') userId: string) {
    try {
      const result =await this._userService.deleteUser(userId);
      return successResponseWithData(result); // assuming no data needed after deletion
    } catch (err) {
      handleException(err);
    }
  }

  // Login User (simplified)
  @Post('login')
  async login(@Body() model: LoginDto) {
    try {
      const result = await this._userService.login(model);
      return successResponseWithData(result);
    } catch (err) {
      handleException(err);
    }
  }
}
