import moment from "moment";
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { removeJob } from '../redux/slices/jobsSlice'
import Image from 'next/image'

const StarsPage = () => {
    const { jobs, totalStars } = useAppSelector(state => state.jobs)
    const dispatch = useAppDispatch()

    const handleRemoveJob = (index: number) => {
        dispatch(removeJob(index))
    }
    return (
        <div className="container min-h-[calc(100vh-68px)] shadow-md">
            {jobs && jobs.length > 0 && (
                <div className="shadow-md">
                    <div className="grid grid-cols-12 mt-6 border bg-yellow-400 py-3 rounded-t-xl">
                        <p className="text-center col-span-4 ">Time</p>
                        <p className="text-center col-span-5 ">Jobs Done</p>
                        <p className="col-span-2 -ml-[8px]">Got Stars</p>
                    </div>
                    {jobs.map((job, index) => (
                        <div className="grid grid-cols-12 border-l border-r border-b items-center py-2" key={job.name}>
                            <p className="text-center col-span-4">{moment(Number(job.createAt)).format('h:mm DD.MM.YYYY')}</p>
                            <div className="col-span-5 flex items-center">
                                <Image src={job.image} width={32} height={32} alt="mop" />
                                <p className="ml-2">{job.name}</p>
                            </div>
                            <div className="col-span-2 relative animate-pulse justify-start">
                                <Image src="/images/star.png" className="rotate-12" width={36} height={36} alt="mop" />
                                <p className="absolute top-2 left-4">{job.star}</p>
                            </div>
                            <div className="col-span-1 -ml-2 hover:cursor-pointer" onClick={() => handleRemoveJob(index)}>
                                <Image src="/images/cancel.png" className="" width={20} height={20} alt="mop" />
                            </div>
                        </div>
                    ))}
                    <div className="grid grid-cols-12 items-center bg-green-400">
                        <p className="col-span-9 text-right mr-4">Total Stars:</p>
                        <div className="col-span-2 relative animate-pulse justify-start mt-1">
                            <Image src="/images/star.png" className="rotate-12" width={36} height={36} alt="mop" />
                            <p className="absolute top-2 left-4">{totalStars}</p>
                        </div>
                    </div>

                </div>
            )}
            {jobs.length === 0 && <p className="text-center mt-4">You have not finished any job yet</p>}
        </div>
    )
}

export default StarsPage