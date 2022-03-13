import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import JobButton from '../components/JobButton'
import Title from '../components/Title'


const Home: NextPage = () => {
  return (
    <div className="container min-h-[calc(100vh-60px)] shadow-md">
      <Head>
        <title>Good Job Kids!</title>
        <meta name="description" content="Good Job Kids" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title name={"Kit"} />
      <div className="h-full">
        <div className="grid grid-cols-2 gap-4 place-items-center">
          <JobButton name="House Cleaning" urlIcon="/images/mop.png" point={2} />
          <JobButton name="Dishwasher" urlIcon="/images/dishwasher.png" point={1} />
          <JobButton name="Cleanup Toys" urlIcon="/images/toys.png" point={1} />
          <JobButton name="Take Care" urlIcon="/images/baby-boy.png" point={1} />
          <JobButton name="Do Homework" urlIcon="/images/homework.png" point={1} />
        </div>
      </div>
    </div>
  )
}

export default Home
