import User from '../models/userModel';
import { IUserDocument } from '../utils/types';

const save = async (user: IUserDocument): Promise<IUserDocument> => {
    return user.save();
};

const findUserByUserName = async (
    userName: string
): Promise<IUserDocument | null> => {
    return User.findOne({ userName: userName });
};

const findUserByUserId = async (_id: string): Promise<IUserDocument | null> => {
    return User.findById(_id);
};

const userService = { save, findUserByUserName, findUserByUserId };

export default userService;
