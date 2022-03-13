import Image from 'next/image'

const Navbar = () => {

    return (
        <nav className="h-[68px] container flex justify-center items-center bg-gray-100 shadow-md">
            <div className="flex gap-x-6">
                <div className="hover:cursor-pointer">
                    <Image src="/images/home.png" width={32} height={32} alt="mop" />
                    <p className="text-center ">Home</p>
                </div>
                <div >
                    <div className="relative w-[38px] h-[38px]">
                        <div className="w-[38px] h-[38px] flex justify-center items-center">
                            <Image src="/images/star.png" width={38} height={38} alt="mop" />
                        </div>
                        <div className="absolute right-0 top-0 w-[38px] h-[38px] flex justify-center items-center">
                            <p className="text-gray-700 font-bold text-md">12</p>
                        </div>
                    </div>
                    <p className="text-center">Stars</p>
                </div>
                <div className="hover:cursor-pointer">
                    <Image src="/images/history.png" className="" width={32} height={32} alt="mop" />
                    <p className="-ml-[6px]">History</p>
                </div>
            </div>

        </nav>
    )
}

export default Navbar