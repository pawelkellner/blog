import React from 'react'
import {getAllPosts, getFilteredPosts, getPosts, getStageCategories} from '../../services/index'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'
import moment from 'moment'
import { CommentsForm} from '../../components/index'
import { useRouter } from 'next/router'

const PostPage = ({post}) =>{
    console.log(post)
    const router = useRouter();

    if(router.isFallback){
        return <h1>Aan het laden.....</h1>
    }

    const getContentFragment = (index, text, obj, type) => {
        let modifiedText = text;
    
        if (obj) {
          if (obj.bold) {
            modifiedText = (<b key={index}>{text}</b>);
          }
    
          if (obj.italic) {
            modifiedText = (<em key={index}>{text}</em>);
          }
    
          if (obj.underline) {
            modifiedText = (<u key={index}>{text}</u>);
          }
        }
    
        switch (type) {
          case 'heading-three':
            return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
          case 'paragraph':
            return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
          case 'heading-four':
            return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
          case 'image':
            return (
              <img
                key={index}
                alt={obj.title}
                height={obj.height}
                width={obj.width}
                src={obj.src}
              />
            );
          default:
            return modifiedText;
        }
      };

    return(
        <Layout>
            <Head>
            <title>{post.title}</title>
            <link rel="icon" href="../favicon.ico" />
            </Head>
            <div className='container mx-auto flex justify-center'>
                <section className='bg-white w-9/12 rounded-xl h-full'>
                    <figure className='w-full h-1/5'>
                        <img src={post.featureImage.url} alt={post.title} className='h-full w-full object-cover object-center rounded-t-xl' />
                    </figure>
                    <div className='flex gap-10 items-center p-4'>
                        <section className='flex items-center'>
                            <figure className='h-10 w-10'>
                                <img src={post.author.photo.url} alt={post.author.name} className='h-full w-full object-fit rounded-full' />
                            </figure>
                            <span>{post.author.name}</span>
                        </section>
                        <section className='flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>
                                {moment(post.createdAt).format('MMM DD, YYYY')} 
                            </span>
                        </section>
                    </div>
                    <section className='px-4 h-auto'>
                        <h1 className='text-5xl text-bold'>{post.title}</h1>
                        {post.content.raw.children.map((typeObj, index) => {
                            const children = typeObj.children.map((item, itemIndex) => getContentFragment(itemIndex, item.text, item))

                            return getContentFragment(index, children, typeObj, typeObj.type)
                        })}
                    </section>
                </section>
            </div>
        </Layout>
    )
}

export async function getStaticPaths(){
    const data = await getAllPosts() || []
    return{
        paths: data.map((stage) => ({
            params: { slug: stage.node.slug}
        })),
        fallback: true
    }
}

export async function getStaticProps({params}){
    const data = await getPosts(params.slug) || []
    return {
      props: {post: data, params: params}
    }
}

export default PostPage;