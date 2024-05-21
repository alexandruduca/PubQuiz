import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { Roles, User } from '../types/user';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: Roles,
  },
});

userSchema.pre<User>('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  this.role = Roles.user;
  next();
});

export default mongoose.model('user', userSchema);
