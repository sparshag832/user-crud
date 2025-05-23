import * as bcrypt from 'bcrypt';

export const hash_data = (data: any): string => {
  return bcrypt.hashSync(data, bcrypt.genSaltSync(12));
};

export const hash_verify = (plain: string, hash: string): boolean => {
  return bcrypt.compareSync(plain, hash);
};

export const otp_generator = (length = 4): string => {
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10); // Use Math.floor for better digit control
  }
  return otp;
};
