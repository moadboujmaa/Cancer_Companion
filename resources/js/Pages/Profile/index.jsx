import React, { useState } from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import { BsFillSendFill, BsImages } from 'react-icons/bs'
import { Tooltip } from 'flowbite-react'
import { HiOutlineBarsArrowDown } from 'react-icons/hi2'
import Post from '../Posts/Post'
import { IoIosImage } from 'react-icons/io'
import InputError from '@/Components/InputError'

export default function index({ auth, liked_posts  }) {
  console.log(auth.user)
  const { data, setData, post, processing, errors, reset } = useForm({
		content: '',
		image: null,
	});
  const [Posts, setPosts] = useState(auth.user.posts);
  const [show, setShow] = useState(false)
  const handleUnlike = (post_id, user_id) => {
    console.log(post_id, ' ', user_id);
    axios.post('/post/decrement', {user_id, post_id})
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
  }

  return (
    <Authenticated auth={auth} >
      <Head title='Profile' />
      <header className="relative w-full py-3 my-3 h-48 rounded-lg bg-[url('icons/banner.jpg')] bg-cover bg-center">
        <div 
          className='absolute p-2 text-xl text-gray-700 bg-gray-300 rounded-full cursor-pointer top-2 right-2' 
          onClick={() => setShow(!show)}>
          <Tooltip
            content="Change Banner"
            placement="bottom"
            className='mt-2 bg-gray-700'
            arrow={false}
          >
            <BsImages className='' />
          </Tooltip>
          {show && <div className='absolute right-0 top-10 bg-white'>
            <div className='w-[300px]'>
              <label htmlFor="image" className='flex flex-col items-center w-full p-4 mb-5 border-[3px] border-dashed rounded-md cursor-pointer border-main'>
                <div className="flex items-center justify-center w-full text-center">
                  <IoIosImage className='text-4xl text-main' />
                </div>
                <p className='mt-2 text-xl text-main'>Select an image</p>
                {data.image && <p className='mt-2 text-main'>File selected</p>}
              </label>
            </div>
            <input type="file" name="image" onChange={(e) => {
                setData('image', e.target.files[0])
            }} id="image" hidden />
            <InputError message={errors.image} className="mt-2" />
          </div>}
        </div>
        <div className='absolute p-2 bg-white rounded-full left-10 bottom-[-50%] translate-y-[-40%] h-3/4 shadow-lg'>
          <img src={`images/${auth.user.avatar}`} alt="profile_picture" className='w-full h-full rounded-full' />
        </div>
      </header>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 pt-2 mt-12'>
        <div className='px-8 py-4 rounded-lg lg:col-span-2 md:col-span-2 sm:col-span-4'>
          <div className='flex items-center justify-between'>
            <p className='pb-5 text-4xl font-bold text-gray-900'>{auth.user.name}</p>
            <p className='flex items-center justify-end gap-2 pb-2 cursor-pointer lg:hidden md:hidden sm:flex text-main hover:underline'>Your posts <HiOutlineBarsArrowDown /></p>
          </div>
          <h1 className='text-xl font-semibold text-gray-900'>Description</h1>
          {auth.user.description
            ?
              <p className='pb-2 '>{auth.user.description.description}</p>
            :
              <p className='pb-2 text-sm duration-300 cursor-pointer text-main hover:underline'>Add a descriptive paragraph about you</p>
          }
          {/* <h1 className='mt-5 text-xl font-semibold text-gray-900'>Country</h1> */}
          <p><span className='text-xl font-semibold text-gray-900'>From: </span>{auth.user.country}</p>
          <h1 className='mt-3 text-xl font-semibold text-gray-900'>Recent likes</h1>
          <div className='w-full gap-3 '>
            {auth.user.likes.map(post => <div className='grid w-full grid-cols-4 p-2 mb-3 bg-white rounded-md shadow-lg'>
              {console.log('like: ', post)}
              <img className='h-full col-span-1 rounded-lg aspect-square' src={post.post.image} alt="post image" />
              <div className='flex items-center justify-start col-span-2 overflow-hidden'>
                <p className='px-2'>You like <span className='text-main hover:underline'>{post.user.name}</span> post </p>
              </div>
              <div className='flex items-center justify-center gap-2 flex-col w-full h-full'>
                <button 
                  className='px-3 py-2 text-white rounded-full bg-main text-semi-bold' 
                  onClick={() => {
                    console.log(post_id, ' ', user_id);
                    axios.post('/post/decrement', {user_id: auth.user.id, post_id: post.post.id})
                      .then((res) => console.log(res.data))
                      .catch((err) => console.log(err))
                  }} >See Post</button> <br />
                <button className='px-3 py-2 text-white rounded-full bg-red-400 hover:bg-red-500 text-semi-bold' >unlike</button>
              </div>
            </div>)}
          </div>
        </div>
        <div className='p-3 mt-4  rounded-md  lg:col-span-2 md:col-span-2 sm:col-span-4 h-fit'>
          {
            auth.user.posts.length == 0 
              ? <div className=''>
                <h1 className='pb-3 text-3xl font-bold text-gray-600'>You don't post anything yet</h1>
                <p className='text-main hover:underline'>Say hello to everyone 👋</p>
              </div>
              : <div className='w-full'>
              {
                Posts.map((post) => {
                  console.log(post)
                  return <Post post_data={post} liked_posts={liked_posts} user={auth.user} />
                })
              }
            </div>
          }
                                
        </div>
      </div>
    </Authenticated>
  )
}
