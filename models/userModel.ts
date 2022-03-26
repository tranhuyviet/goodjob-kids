import mongoose from 'mongoose';

const { Schema, model, models, Types } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
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

const User = models.users || model('users', userSchema);

export default User;
