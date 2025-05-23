import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty({ message: 'Car name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Car model is required' })
  model: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Year must be a number' })
  @IsNotEmpty({ message: 'Manufacturing year is required' })
  year: number;
}
