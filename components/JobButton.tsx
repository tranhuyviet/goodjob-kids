import Image from 'next/image'

interface IJobButton {
    name: string
    urlIcon: string
    point: number
}

const JobButton = ({ name, urlIcon, point }: IJobButton) => {
    return (
        <div className="shadow-lg w-full min-h-[160px] flex items-center justify-center relative rounded-2xl bg-green-100 hover:cursor-pointer">
            <div className="flex flex-col items-center justify-center p-4">
                <Image src={urlIcon} className="job-icons" width={70} height={70} alt="mop" />
                <p className="mt-2 text-lg">{name}</p>
            </div>
            <div className="absolute right-2 top-2">
                <div className="relative animate-pulse">
                    <Image src="/images/star.png" className="rotate-12" width={36} height={36} alt="mop" />
                    <p className="absolute right-[14px] top-2">{point}</p>
                </div>
            </div>
        </div>
    )
}

export default JobButton