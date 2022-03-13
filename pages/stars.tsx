import React from 'react'
import { useAppSelector } from '../redux/hooks'

const StarsPage = () => {
    const { jobs, totalStars } = useAppSelector(state => state.jobs)
    console.log(jobs)
    return (
        <div>StarsPage</div>
    )
}

export default StarsPage