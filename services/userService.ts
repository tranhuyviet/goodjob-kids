import User from '../models/userModel';
import { IJobDone, IUserDocument } from '../utils/types';

const save = async (user: IUserDocument): Promise<IUserDocument> => {
    return user.save();
};

const findUserByName = async (name: string): Promise<IUserDocument | null> => {
    return User.findOne({ name });
};

const userService = { save, findUserByName };

export default userService;
