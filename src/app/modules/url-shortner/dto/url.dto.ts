import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID, IsUrl, Min } from 'class-validator';

export class CreateShortUrlDto {
  @IsUrl()
  originalUrl: string;

  @IsUUID()
  userId: string;
}

export class GetAllUrlsDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;
}
