import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  leader: {
    type: userSchema,
    required: true,
  },
  members: {
    type: [userSchema],
    maxlength: 6,
  },
  joinRequests: {
    type: [userSchema],
  },
});

export default mongoose.model('team', teamSchema);
