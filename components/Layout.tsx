import React, { ReactChild } from 'react'
import Navbar from './Navbar'
import { useAppDispatch } from '../redux/hooks'
import useSWR from 'swr'
import fetchApi from '../utils/fetchApi'
import { setJobsDone } from '../redux/slices/userSlice'

interface IProps {
    children: ReactChild
}

const Layout = ({ children }: IProps) => {
    const { data, error } = useSWR('/users/jobs-done', fetchApi)
    const dispatch = useAppDispatch()

    if (data) {
        dispatch(setJobsDone(data.data.jobsDone))
    }

    if (error) return <p>Something went wrong.</p>

    return (
        <div className="relative">
            {data && <>
                <Navbar />
                <div>
                    {children}
                </div>
            </>}
        </div>
    )
}

export default Layout