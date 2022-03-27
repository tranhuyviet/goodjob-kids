import Job from '../models/jobModel';
import { IJobDocument } from '../utils/types';

const save = async (job: IJobDocument): Promise<IJobDocument> => {
    return job.save();
};

const findJobByName = async (name: string): Promise<IJobDocument | null> => {
    return Job.findOne({ name });
};

const jobService = { save, findJobByName };

export default jobService;
