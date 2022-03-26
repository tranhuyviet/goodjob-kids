import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { useAppDispatch } from '../redux/hooks'
import { addJob } from '../redux/slices/userSlice'
import { IJob, IJobDone } from '../utils/types'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

interface IJobButton {
    job: IJob,
    setIsOpenDialog: Dispatch<SetStateAction<boolean>>
}

const JobButton = ({ job, setIsOpenDialog }: IJobButton) => {
    const dispatch = useAppDispatch()
    const handleJobClick = async () => {
        try {
            // const newJobDone: IJobDone = {
            //     ...job,
            //     time: String(Date.now()),
            //     jobDoneId: uuidv4()
            // }
            const newJobDone = {
                ...job,
                time: String(Date.now()),
            }
            const { data } = await axios.put('/users/name', newJobDone)
            console.log(data);
            // dispatch(addJob(newJobDone))
            setIsOpenDialog(true)
        } catch (error) {
            console.log('AAAA', error)
        }

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