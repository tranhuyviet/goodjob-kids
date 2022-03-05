import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import JobButton from '../components/JobButton'


const Home: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Good Job Kids!</title>
        <meta name="description" content="Good Job Kids" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hello App</h1>
      <div>
        <div className="flex justify-center space-x-4">

          <JobButton name="House Cleaning" urlIcon="/images/mop.png" />
          <JobButton name="Dishwasher" urlIcon="/images/dishwasher.png" />
          <JobButton name="Cleanup Toys" urlIcon="/images/toys.png" />
        </div>

      </div>
    </div>
  )
}

export default Home
