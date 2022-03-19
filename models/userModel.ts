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
            jobDone: {
                type: Types.ObjectId,
                ref: 'jobs',
            },
            time: String,
        },
    ],
});

const User = models.users || model('users', userSchema);

export default User;
