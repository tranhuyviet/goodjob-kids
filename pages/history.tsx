import { GetServerSideProps, NextPage } from 'next'
import { useAppDispatch } from '../redux/hooks'
import { IUser } from '../utils/types'
import { signup } from '../redux/slices/userSlice'
import { decodeToken } from '../utils/generate'

const HistoryPage: NextPage<{ userId: string }> = ({ userId }) => {
    const dispatch = useAppDispatch()
    if (userId) {
        dispatch(signup(userId))
    }

    return (
        <div className="container min-h-[calc(100vh-68px)] shadow-md relative pt-6">History Page</div>
    )
}

export default HistoryPage

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = context.req.cookies.goodjobKids
    const userId = decodeToken(token)

    if (!userId) return { redirect: { destination: '/signup', permanent: false } };

    return {
        props: {
            userId
        }
    }
}