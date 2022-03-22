import { GetServerSideProps, NextPage } from 'next'
import { useAppDispatch } from '../redux/hooks'
import { IUser } from '../utils/types'
import { signup } from '../redux/slices/userSlice'

const HistoryPage: NextPage<IUser> = ({ name }) => {
    const dispatch = useAppDispatch()
    if (name) {
        dispatch(signup(name))
    }

    return (
        <div className="container min-h-[calc(100vh-68px)] shadow-md relative pt-6">History Page</div>
    )
}

export default HistoryPage

export const getServerSideProps: GetServerSideProps = async (context) => {
    const name = context.req.cookies.goodjobKids
    if (!name) return { redirect: { destination: '/signup', permanent: false } };

    return {
        props: {
            name
        }
    }
}