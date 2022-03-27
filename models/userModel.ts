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
            name: String,
            image: String,
            star: Number,
            time: String,
        },
    ],
});

// return token to client
userSchema.methods.returnToken = function returnToken() {
    return generateToken(
        { _id: this._id, name: this.name, userName: this.userName },
        process.env.JWT_SECRET as string
    );
};

const User = models.users || model('users', userSchema);

export default User;
