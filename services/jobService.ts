import Job from '../models/jobModel';
import { IJob, IJobDocument } from '../utils/types';

const save = async (job: IJobDocument): Promise<IJobDocument> => {
    return job.save();
};

const findJobByName = async (name: string): Promise<IJobDocument | null> => {
    return Job.findOne({ name });
};

const findJobById = async (jobId: string): Promise<IJobDocument | null> => {
    return Job.findById(jobId);
};

const getJobs = async (): Promise<IJobDocument[]> => {
    return Job.find();
};

const jobService = { save, findJobByName, findJobById, getJobs };

export default jobService;
