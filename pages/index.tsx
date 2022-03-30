import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useAppDispatch } from '../redux/hooks'
import { signup } from '../redux/slices/userSlice'
import { decodeToken } from '../utils/generate'
import JobButtonList from '../components/HomePage/JobButtonList'

const Home: NextPage<{ userId: string }> = ({ userId }) => {

  const dispatch = useAppDispatch()
  if (userId) {
    dispatch(signup(userId))
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
  const userId = decodeToken(token)

  if (!userId) return { redirect: { destination: '/signup', permanent: false } };

  return {
    props: {
      userId
    }
  }
}
