import Image from 'next/image'
import { useAppDispatch } from '../redux/hooks'
import { addJob } from '../redux/slices/jobsSlice'

interface IJobButton {
    name: string
    urlIcon: string
    star: number
}

const JobButton = ({ name, urlIcon, star }: IJobButton) => {
    const dispatch = useAppDispatch()
    const handleJobClick = () => {
        const job = {
            name,
            star,
            createAt: Date.now().toString()
        }
        dispatch(addJob(job))
    }
    return (
        <div className="shadow-lg w-full min-h-[160px] flex items-center justify-center relative rounded-2xl bg-green-100 hover:cursor-pointer" onClick={handleJobClick}>
            <div className="flex flex-col items-center justify-center p-4">
                <Image src={urlIcon} className="job-icons" width={70} height={70} alt="mop" />
                <p className="mt-2 text-lg">{name}</p>
            </div>
            <div className="absolute right-2 top-2">
                <div className="relative animate-pulse">
                    <Image src="/images/star.png" className="rotate-12" width={36} height={36} alt="mop" />
                    <p className="absolute right-[14px] top-2">{star}</p>
                </div>
            </div>
        </div>
    )
}

export default JobButton