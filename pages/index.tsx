import type { NextPage } from 'next'
import Head from 'next/head'
import JobButton from '../components/JobButton'
import Title from '../components/Title'
import { jobs } from '../utils/jobsData'

const Home: NextPage = () => {
  return (
    <div className="container min-h-[calc(100vh-68px)] shadow-md">
      <Head>
        <title>Good Job Kids!</title>
        <meta name="description" content="Good Job Kids" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title name={"Kit"} />
      <div className="h-full">
        <div className="grid grid-cols-2 gap-4 place-items-center">
          {jobs && jobs.map(job => (
            <JobButton key={job.name} job={job} />
          ))}
          {/* <JobButton name="House Cleaning" urlIcon="/images/mop.png" star={2} />
          <JobButton name="Dishwasher" urlIcon="/images/dishwasher.png" star={1} />
          <JobButton name="Cleanup Toys" urlIcon="/images/toys.png" star={1} />
          <JobButton name="Take Care" urlIcon="/images/baby-boy.png" star={1} />
          <JobButton name="Do Homework" urlIcon="/images/homework.png" star={1} /> */}
        </div>
      </div>
    </div>
  )
}

export default Home
