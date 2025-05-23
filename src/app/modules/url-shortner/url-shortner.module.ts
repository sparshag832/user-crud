import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from 'src/app/entities/url.entity';
import { UrlShortnerController } from './url-shortner.controller';
import { UrlShortnerService } from './url-shortner.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Url.name,
        schema: UrlSchema,
      },
    ]),
  ],
  providers: [UrlShortnerService],
  controllers: [UrlShortnerController],
})
export class UrlShortnerModule {}
