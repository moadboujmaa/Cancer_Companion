import React from 'react'
import { BiLink } from 'react-icons/bi'
export default function ArticleItem({ article }) {
  return (
    <div className='col-span-1 bg-white p-3 rounded-md shadow-lg'>
      <p className='text-2xl font-bold text-main'>{article.title}</p>
      <div className='flex items-center justify-between mt-2'>
        <p className='font-semibold'>Published by: <span className='text-main'>{article.user.name}</span></p>
        <a href={article.link} className='bg-main text-white p-2 text-xl rounded-sm' target='_blank'><BiLink /></a>
      </div>
    </div>
  )
}
