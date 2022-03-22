import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import JobButton from '../components/JobButton'
import { jobs } from '../utils/jobsData'
import Image from 'next/image'
import { useAppDispatch } from '../redux/hooks'
import { signup } from '../redux/slices/userSlice'
import { IUser } from '../utils/types'

const Home: NextPage<IUser> = ({ name }) => {

  const dispatch = useAppDispatch()
  if (name) {
    dispatch(signup(name))
  }

  const [isOpenDialog, setIsOpenDialog] = useState(false)

  useEffect(() => {
    if (isOpenDialog) {
      setTimeout(() => {
        setIsOpenDialog(false)
      }, 2000)
    }
  }, [isOpenDialog])

  return (
    <div className="container min-h-[calc(100vh-68px)] shadow-md">
      <Head>
        <title>Good Job Kids!</title>
        <meta name="description" content="Good Job Kids" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Title name={"Kit"} /> */}
      <div className="h-full pt-6">
        <div className="grid grid-cols-2 gap-4 place-items-center">
          {jobs && jobs.map(job => (
            <JobButton key={job._id} job={job} setIsOpenDialog={setIsOpenDialog} />
          ))}
        </div>
        {isOpenDialog && (
          <div className="absolute container max-h-screen backdrop-brightness-[.4] inset-0 flex justify-center items-center">
            <div className="text-center">
              <h2 className="text-4xl text-center text-yellow-400 px-4 py-4 uppercase animate-ping">Good Job</h2>
              <h2 className="text-4xl text-center px-4 py-4 uppercase animate-bounce tracking-widest text-red-400">{name}</h2>
              <Image src="/images/like.png" className=" animate-pulse mt-6 block" width={160} height={160} alt="mop" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const name = context.req.cookies.goodjobKids
  if (!name) return { redirect: { destination: '/signup', permanent: false } };

  return {
    props: {
      name
    }
  }
}
