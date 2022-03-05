import Image from 'next/image'

const Navbar = () => {
    return (
        <nav className="h-[60px] bg-gray-100 shadow-lg flex items-center justify-between text-gray-700 px-6 font-body">
            <div className="flex gap-x-6">
                <div className="border-b-[3px] border-red-400 hover:cursor-pointer">
                    <Image src="/images/home.png" className="shadow-2xl" width={30} height={30} alt="mop" />
                </div>
                <div className="border-b-[3px] border-transparent hover:cursor-pointer">
                    <Image src="/images/calculator.png" className="" width={30} height={30} alt="mop" />
                </div>
                <div className="border-b-[3px] border-transparent hover:cursor-pointer">
                    <Image src="/images/history.png" className="" width={30} height={30} alt="mop" />
                </div>
            </div>
            <div className="relative">
                <div className="w-[46px] h-full flex justify-center items-center">
                    <Image src="/images/star.png" className="rotate-12 " width={46} height={46} alt="mop" />
                </div>
                <div className="absolute right-0 top-0 w-[46px] h-full flex justify-center items-center">
                    <p className=" top-2 text-gray-700 font-bold text-md">12</p>
                </div>
            </div>
        </nav>
    )
}

export default Navbar