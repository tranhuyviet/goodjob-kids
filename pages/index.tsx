import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useAppDispatch } from '../redux/hooks'
import { signup } from '../redux/slices/userSlice'
import { decodeToken } from '../utils/generate'
import JobButtonList from '../components/HomePage/JobButtonList'
import { IUser, IUserWithJobsDone } from '../utils/types'
import axios from 'axios'

const Home: NextPage<{ user: IUserWithJobsDone }> = ({ user }) => {

  const dispatch = useAppDispatch()
  if (user) {
    dispatch(signup(user))
  }

  console.log('INDEX PAGE -  RENDER')

  return (
    <div className="container min-h-[calc(100vh-68px)] shadow-md">
      <Head>
        <title>Good Job Kids!</title>
        <meta name="description" content="Good Job Kids" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <JobButtonList />
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies.goodjobKids
  const decodeUser = decodeToken(token)

  let user: IUserWithJobsDone

  if (decodeUser?._id !== null) {
    const res = await axios.get('/users/' + decodeUser!._id)

    if (res.data.status === 'success') {
      user = res.data.data.user
    } else {
      return { redirect: { destination: '/signup', permanent: false } }
    }
  } else {
    return { redirect: { destination: '/signup', permanent: false } }
  }

  return {
    props: {
      user
    }
  }
}
