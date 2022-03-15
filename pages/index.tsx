import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import JobButton from '../components/JobButton'
import Title from '../components/Title'
import { jobs } from '../utils/jobsData'
import Image from 'next/image'

const Home: NextPage = () => {

  const [isOpenDialog, setIsOpenDialog] = useState(false)

  useEffect(() => {
    if (isOpenDialog) {
      setTimeout(() => {
        setIsOpenDialog(false)
      }, 2000)
    }
  }, [isOpenDialog])

  return (
    <div className="container min-h-[calc(100vh-68px)] shadow-md relative">
      <Head>
        <title>Good Job Kids!</title>
        <meta name="description" content="Good Job Kids" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Title name={"Kit"} /> */}
      <div className="h-full pt-6">
        <div className="grid grid-cols-2 gap-4 place-items-center">
          {jobs && jobs.map(job => (
            <JobButton key={job.name} job={job} setIsOpenDialog={setIsOpenDialog} />
          ))}
        </div>
        {isOpenDialog && (
          <div className="absolute w-full h-full bg-gray-600 opacity-90 inset-0 flex justify-center items-center">
            <div>
              <Title name={""} className="animate-ping" />
              <Image src="/images/like.png" className=" animate-pulse mt-6 block" width={180} height={180} alt="mop" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
