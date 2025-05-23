import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({required:true})  
  @IsEmail()
  email: string;

  @ApiProperty({required:true})
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({required:true})
  @IsString()
  password: string;
}

export class GetUsersDto{
    @ApiProperty({ required: false, description: 'Search term for filtering users' })
    @IsOptional()
    @IsString()
    search: string;
  
    @ApiProperty({ required: false, description: 'Pagination: page number' })
    @IsOptional()
    @IsInt()
    @Min(1)
    pageNumber: number;
  
    @ApiProperty({ required: false, description: 'Pagination: number of results per page' })
    @IsOptional()
    @IsInt()
    @Min(1)
    pageSize: number;
  }

  export class LoginDto {
    @ApiProperty({required:true})  
    @IsEmail()
    email: string;
  
    @ApiProperty({required:true})
    @IsString()
    password: string;
  }
