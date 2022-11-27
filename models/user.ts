import { Schema, model, PassportLocalDocument } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

export interface IUser extends PassportLocalDocument {
  username: string;
}

const schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  }
});

schema.plugin(passportLocalMongoose);

export const User = model('User', schema);
