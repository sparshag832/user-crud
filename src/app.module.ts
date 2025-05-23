import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './app/modules/car/car.module';
import { UrlShortnerModule } from './app/modules/url-shortner/url-shortner.module';
import { MongodbConnectionModule } from 'database/mongoose.module';
import { UserModule } from './app/modules/user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',   
    }),
    CarModule, UrlShortnerModule,MongodbConnectionModule,UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
