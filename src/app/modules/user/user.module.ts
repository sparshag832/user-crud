import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from 'src/app/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { JsonWebTokenService } from 'shared/src';

@Module({
  imports:[    MongooseModule.forFeature([
        {
          name: User.name,
          schema: UserSchema,
        },
      ]),
    ],
  providers: [UserService,JsonWebTokenService],
  controllers: [UserController]
})
export class UserModule {}
