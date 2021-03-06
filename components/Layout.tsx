import React, { ReactChild, useEffect } from 'react'
import Navbar from './Navbar'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import useSWR from 'swr'
import fetchApi from '../utils/fetchApi'
// import { setJobsDone } from '../redux/slices/userSlice'
import { setJobs } from '../redux/slices/jobSlice'

interface IProps {
    children: ReactChild
}

const Layout = ({ children }: IProps) => {
    // const user = useAppSelector(state => state.user)

    // const { data: userData, error: errorUser } = useSWR('/users/jobs-done', fetchApi)
    // const { data: jobsData, error: errorJobs } = useSWR('/jobs', fetchApi)
    // const dispatch = useAppDispatch()

    // useEffect(() => {
    //     // if (userData && userData.status === 'success') {
    //     //     dispatch(setJobsDone(userData.data.jobsDone))
    //     // }
    //     if (jobsData && jobsData.status === 'success') {
    //         dispatch(setJobs(jobsData.data.jobs))
    //     }
    // }, [jobsData, dispatch]);

    //if (errorJobs) return <p>Something went wrong.</p>

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