import React, { ReactChild, useEffect } from 'react'
import Navbar from './Navbar'
import { useAppDispatch } from '../redux/hooks'
import useSWR from 'swr'
import fetchApi from '../utils/fetchApi'
import { setUserLoggedIn } from '../redux/slices/userSlice'
import { setJobs } from '../redux/slices/jobSlice'

interface IProps {
    children: ReactChild
}

const Layout = ({ children }: IProps) => {
    const { data: userData, error: errorUser } = useSWR('/users', fetchApi)
    const { data: jobsData, error: errorJobs } = useSWR('/jobs', fetchApi)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (userData) {
            dispatch(setUserLoggedIn(userData.data.user))
        }
        if (jobsData) {
            dispatch(setJobs(jobsData.data.jobs))
        }
    }, [userData, jobsData, dispatch]);

    if (errorUser || errorJobs) return <p>Something went wrong.</p>

    console.log('LAYOUT - RENDER')

    return (
        <div className="relative">
            <Navbar />
            <div>
                {children}
            </div>
        </div>
    )
}

export default Layout