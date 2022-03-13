import classNames from 'classNames';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Navbar = () => {
    const { pathname } = useRouter()
    return (
        <nav className="h-[68px] container flex justify-center items-center bg-gray-100 shadow-md">
            <div className="flex gap-x-8">
                <Link href="/" >
                    <a className="hover:cursor-pointer relative hover:nav-link-active">
                        <Image src="/images/home.png" width={32} height={32} alt="mop" />
                        <p className={classNames(`text-center ${pathname === '/' ? 'nav-link-active' : ''}`)} >Home</p>
                    </a>
                </Link>

                <Link href="/stars">
                    <a className="relative w-[38px] h-[38px] block hover:cursor-pointer hover:nav-link-active">
                        <div className="w-[38px] h-[38px] flex justify-center items-center">
                            <Image src="/images/star.png" width={38} height={38} alt="mop" />
                        </div>
                        <div className="absolute right-0 top-0 w-[38px] h-[38px] flex justify-center items-center">
                            <p className="text-gray-700 font-bold text-md">12</p>
                        </div>
                        <p className={classNames(`text-center ${pathname === '/stars' ? 'nav-link-active' : ''}`)} >Stars</p>
                    </a>
                </Link>

                <Link href="/history">
                    <a className="hover:cursor-pointer hover:nav-link-active">
                        <Image src="/images/history.png" className="" width={32} height={32} alt="mop" />
                        <p className={classNames(`text-center -ml-[6px] ${pathname === '/history' ? 'nav-link-active' : ''}`)} >History</p>
                    </a>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar