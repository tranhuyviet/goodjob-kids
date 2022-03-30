import mongoose from 'mongoose';
import { generateToken } from '../utils/generate';

const { Schema, model, models, Types } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    jobsDone: [
        {
            jobId: {
                type: Types.ObjectId,
                ref: 'jobs',
            },
            time: String,
        },
    ],
});

// return token to client
userSchema.methods.returnToken = function returnToken() {
    return generateToken(this._id);
};

const User = models.users || model('users', userSchema);

export default User;
