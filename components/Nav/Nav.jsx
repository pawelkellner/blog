import React, { useEffect, useState } from 'react'

import Link from 'next/link';
import { getStageCategories } from '../../services';

const Nav = ({ categories }) => {
    const [stageCategories, setStageCategories] = useState([])
    
    useEffect(() =>{
        getStageCategories()
            .then(result => setStageCategories(result))
    }, [])

    console.log(stageCategories)

    // getStageCategories()
    //     .then(result => setStageCategories(result));
  return (
    <div className='relative container mx-auto px-10 mb-10'>
        <div className='border-b w-full inline-block border-blue-400 py-8'>
            <Link href="/">
                <span className='cursor-pointer font-bold text-4xl text-white'>
                Pawel's Stage Blog
                </span>
            </Link>
        </div>
        <div className='hidden md:float-left md:contents'>
            {stageCategories.map((category) => (
                <Link className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer' key={category.node.slug} href={`/stage/${category.node.slug}`}>
                    <span >
                        {category.node.title}
                    </span>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Nav