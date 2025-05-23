import { Injectable, OnModuleInit } from '@nestjs/common';
import * as jsonwebtoken from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

type EncryptType = {
  data: any;
  secret?: string;
  options?: jsonwebtoken.SignOptions;
};

@Injectable()
export class JsonWebTokenService implements OnModuleInit {
  private secretKey!: string;

  constructor(private config: ConfigService) {}

  onModuleInit() {
    const secret = this.config.get<string>('TOKEN_SECRET_KEY');
    if (!secret) {
      throw new Error('TOKEN_SECRET_KEY is not defined in environment variables');
    }
    this.secretKey = secret;
  }

  async encrypt(model: EncryptType): Promise<string> {
    return jsonwebtoken.sign(
      model.data,
      model.secret ?? this.secretKey,
      model.options
    );
  }

  async decrypt(token: string, secret?: string) {
    const data = jsonwebtoken.verify(token, secret ?? this.secretKey);
    return data;
  }
}
