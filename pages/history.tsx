import { GetServerSideProps, NextPage } from 'next'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { IUser } from '../utils/types'
import { signup } from '../redux/slices/userSlice'
import { decodeToken } from '../utils/generate'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const HistoryPage: NextPage = () => {
    // const router = useRouter()
    // const isUserLoggedin = useAppSelector(state => state.user._id)

    // useEffect(() => {
    //     if (!isUserLoggedin) {
    //         router.push('/signup')
    //     }
    // }, [isUserLoggedin, router])

    return (
        <div className="container min-h-[calc(100vh-68px)] shadow-md relative pt-6">History Page</div>
    )
}

export default HistoryPage
