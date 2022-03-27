import { IHistoryDocument } from '../utils/types';

const save = async (history: IHistoryDocument): Promise<IHistoryDocument> => {
    return history.save();
};

const historyService = { save };

export default historyService;
