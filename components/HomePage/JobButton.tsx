import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { IJob, IJobDonePopulated } from '../../utils/types'
import axios from 'axios'
import { addJob } from '../../redux/slices/userSlice'

interface IJobButton {
    job: IJob,
    setIsOpenDialog: Dispatch<SetStateAction<boolean>>
}

const JobButton = ({ job, setIsOpenDialog }: IJobButton) => {
    const dispatch = useAppDispatch()

    const handleJobClick = async () => {
        try {
            const { data } = await axios.put(`/users/add-job-done/${job._id}`, { time: Date.now() })
            console.log('DATAAAAA', data)
            const newJobDone: IJobDonePopulated = {
                _id: data.data.jobDoneId,
                jobId: {
                    name: job.name,
                    image: job.image,
                    star: job.star
                },
                time: Date.now().toString()
            }
            console.log('NEW JOB', newJobDone)
            dispatch(addJob(newJobDone))
            console.log('aaaaa')
            setIsOpenDialog(true)
        } catch (error) {
            console.log('AAAA', error)
        }
    }

    console.log('JOBBUTTON - RENDER')

    return (
        <div className="shadow-lg w-full min-h-[160px] flex items-center justify-center relative rounded-2xl bg-green-100 hover:cursor-pointer" onClick={handleJobClick}>
            <div className="flex flex-col items-center justify-center p-4">
                <Image src={job.image} className="job-icons" width={70} height={70} alt="mop" />
                <p className="mt-2 text-lg capitalize">{job.name}</p>
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