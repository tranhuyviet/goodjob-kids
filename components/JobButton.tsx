import Image from 'next/image'

interface IJobButton {
    name: string
    urlIcon: string
}

const JobButton = ({ name, urlIcon }: IJobButton) => {
    return (
        <div className="flex flex-col items-center">
            <Image src={urlIcon} className="job-icons" width={60} height={60} alt="mop" />
            <p className="mt-2 text-lg">{name}</p>
        </div>
    )
}

export default JobButton