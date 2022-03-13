import Image from 'next/image'
import { useAppDispatch } from '../redux/hooks'
import { addJob, IJob } from '../redux/slices/jobsSlice'

interface IJobButton {
    job: IJob
}

const JobButton = ({ job }: IJobButton) => {
    const dispatch = useAppDispatch()
    const handleJobClick = () => {
        const newJob: IJob = {
            ...job,
            createAt: String(Date.now())
        }
        dispatch(addJob(newJob))
    }
    return (
        <div className="shadow-lg w-full min-h-[160px] flex items-center justify-center relative rounded-2xl bg-green-100 hover:cursor-pointer" onClick={handleJobClick}>
            <div className="flex flex-col items-center justify-center p-4">
                <Image src={job.image} className="job-icons" width={70} height={70} alt="mop" />
                <p className="mt-2 text-lg">{job.name}</p>
            </div>
            <div className="absolute right-2 top-2">
                <div className="relative animate-pulse">
                    <Image src="/images/star.png" className="rotate-12" width={36} height={36} alt="mop" />
                    <p className="absolute right-[14px] top-2">{job.star}</p>
                </div>
            </div>
        </div>
    )
}

export default JobButton