import React from 'react'
import { getStageCategories } from '../../services'
import Link from 'next/link'

const StageCard = ({stage}) => {
  return (

    <article className='group relative bg-yellow-600 w-2/5 h-96 rounded-xl overflow-hidden'>
      <Link href={`/stage/${stage.slug}`}>
        <figure className='h-full w-full'>
          <img src={stage.photo.url} alt="" className='transition duration-500 object-cover h-full w-full rounded-xl group-hover:scale-110'/>
          <div className='absolute h-full w-full bg-black bg-opacity-20 rounded-xl top-0 left-0'></div>
        </figure>
        <h1 className='absolute bottom-2 left-4 text-white text-xl'>{stage.title}</h1>
      </Link>
    </article>
  )
}

export default StageCard