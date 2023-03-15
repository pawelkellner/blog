import React from 'react'
import {getFilteredPosts, getStageCategories} from '../../services/index'
import { PostCard } from '../../components/index'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'
import { useRouter } from 'next/router'

const StagePage = ({posts, params}) => {

  const router = useRouter();

    if(router.isFallback){
        return <h1>Aan het laden.....</h1>
    }
    return (
    <Layout>
        <Head>
        <title>Guest Compass</title>
        <link rel="icon" href="../favicon.ico" />
        </Head>
        <div className='relative container flex mx-auto px-10 flex-col items-center '>
            {posts?.length ? posts.map((post, index) => (
                <PostCard key={index} post={post.node} />
            )) : <h1 className='text-white text-xl'>Er zijn nog geen blogs beschikbaar!</h1> }
        </div>
    </Layout>
  )
}

// export async function getStaticPaths(){
//     const data = await getStageCategories() || []
//     return{
//         paths: data.map((stage) => ({
//             params: { slug: stage.node.slug}
//         })),
//         fallback: true
//     }
// }

export async function getServerSideProps({params}){
    const data = await getFilteredPosts(params.slug) || []
    return {
      props: {posts: data, params: params}
    }
}

export default StagePage