import { GetServerSideProps, NextPage } from 'next'
import { useAppDispatch } from '../redux/hooks'
import { IUser } from '../utils/types'
import { signup } from '../redux/slices/userSlice'
import { decodeToken } from '../utils/generate'

const HistoryPage: NextPage<{ user: IUser }> = ({ user }) => {
    const dispatch = useAppDispatch()
    if (user) {
        dispatch(signup(user))
    }

    return (
        <div className="container min-h-[calc(100vh-68px)] shadow-md relative pt-6">History Page</div>
    )
}

export default HistoryPage

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = context.req.cookies.goodjobKids
    const user = decodeToken(token)

    if (!user) return { redirect: { destination: '/signup', permanent: false } };

    return {
        props: {
            user
        }
    }
}