import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import Image from 'next/image'
import {StageCard, PostCard, Nav, PostWidget} from '../components/index'
import {getStageCategories} from '../services/index'

export default function Home( props ){
  return (
      <Layout>
    <div className="container mx-auto px-10 mb-8 h-full">
      <Head>
        <title>Stage Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex align-center items-center justify-center gap-60 h-3/4'>
          {props.stages.map((stage, index) => (
            <StageCard key={index} stage={stage.node} />
          ))}
      </div>
    </div>
    </Layout>
  )
}

export async function getServerSideProps(){
  const stages = await getStageCategories() || []
  return {
    props: {stages}
  }
}