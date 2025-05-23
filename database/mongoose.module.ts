import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI, // Directly use MONGO_URI without appending MONGO_DB
        retryAttempts: 5,
      }),
    }),
  ],
  exports: [MongooseModule],
})
export class MongodbConnectionModule {}
