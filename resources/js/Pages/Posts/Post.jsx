import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AiOutlineLike, AiTwotoneLike } from 'react-icons/ai'
import { MdInsertComment, MdOutlineComment, MdSend } from 'react-icons/md'
import { RiShareForwardLine } from 'react-icons/ri'
import axios from 'axios'
import { useForm } from '@inertiajs/react'

export default function Post({ post_data, user, liked_posts }) {
  // Add a comment
  const { data, setData, post, processing, errors, reset } = useForm({
		comment: '',
    post_id: post_data.id
	});
  const submit = (e) => {
		e.preventDefault();
		post(route('add.comment'));
	};

  // control post text
  const [showAll, setShowAll] = useState(false)
  const content = post_data.content
  const smallContent = content.split('').splice(0, 70).join('')
  // see if the user like the post
  const checkLike = (post) => {
    let exist = false
    post.likes.map(like => {
      user.likes.map(user_like => {
        if (like.post_id == user_like.post_id && like.user_id == user.id) {
          exist = true
        }
      })
    })
    return post.likes.some(like => {
      console.log(like.user_id, ' ', user.id)
      return like.user_id === user.id
    });
  }

  const [isLike, setIsLike] = useState(checkLike(post_data))
  console.log(post_data)
  // control comment
  const [showComments, setShowComments] = useState(false)

  // ajax request to increase/decrease like in database
  const requestedData = {
    post_id: post_data.id,
    user_id: user.id,
  }
  const postIncrementLike = () => {
    axios.post('/post/increment', requestedData)
      .then((res) => console.log(res.data))
      .catch(err => console.log(err))
    setIsLike(true)
  }
  const postDecrementLike = () => {
    axios.post('/post/decrement', requestedData)
      .then((res) => console.log(res.data))
      .catch(err => console.log(err))
    setIsLike(false)
  }
  console.log(isLike)
  // ajax request to add comment

  // difference between current date and the post created date
  function formatTimeDifference(PostDate) {
    const date = new Date(PostDate);
    const now = new Date();
    const diffMilliseconds = now - date;
    const diffSeconds = Math.floor(diffMilliseconds / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMinutes < 1) {
      return 'less than a minute ago';
    } else if (diffMinutes <= 59) {
      return diffMinutes + 'min ago';
    } else if (diffHours < 24) {
      return diffHours + 'h';
    } else if (diffDays < 7) {
      return diffDays + 'day' + (diffDays > 1 ? 's' : '');
    } else {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    }
  }
  return (
    <div className='max-w-[500px] mx-auto my-3 bg-white rounded-md shadow-lg'>
      <header className='flex items-center justify-between px-2 pt-2'>
        <div className='flex items-start justify-start gap-3'>
          <img src={`images/${post_data.user.avatar}`} className='w-10 rounded-full' alt="profile pic" />
          <div className=''>
            <p className='font-semibold leading-tight capitalize'>{post_data.user.name}</p>
            <p className='text-sm text-gray-600'>{formatTimeDifference(post_data.created_at)}</p>
          </div>
        </div>
        <div className='p-1 mr-2 text-xl rounded-full text-main bg-second'>
          <BsThreeDotsVertical />
        </div>
      </header>
      <div>
        {/* control text */}
        {showAll 
          ? <p className='p-2'>
              {content} <span onClick={() => setShowAll(false)} className='cursor-pointer text-main hover:underline'>show less</span>
            </p> 
          : <p className='p-2'>
              {smallContent}... <span onClick={() => setShowAll(true)} className='cursor-pointer text-main hover:underline'>show more</span>
            </p> 
        }
        {post_data.image && <img src={post_data.image} alt='post image' className='w-full' />}
      </div>
      <div className='flex items-center justify-end gap-2 p-2 pb-0 text-sm text-gray-500 underline'>
        <p>{post_data.likes.length} like</p>
        <p>{post_data.comments.length} comments</p>
      </div>
      <div className='grid grid-cols-3'>
        {/* action buttons */}
        { !isLike ?
            <div onClick={() => postIncrementLike()} className='flex items-center justify-center col-span-1 p-2 m-2 bg-purple-200 rounded-md shadow-md cursor-pointer'>
              <AiOutlineLike className='text-2xl text-main' />
            </div>  
          : <div onClick={() => postDecrementLike()} className='flex items-center justify-center col-span-1 p-2 m-2 bg-purple-200 rounded-md shadow-md cursor-pointer'>
            <AiTwotoneLike className="text-2xl text-main" /> 
          </div>  
        }
        <div className='flex items-center justify-center col-span-1 p-2 m-2 bg-purple-200 rounded-md shadow-md cursor-pointer' onClick={() => setShowComments(!showComments)}>
          {showComments 
            ? <MdInsertComment className='text-2xl text-main' />
            : <MdOutlineComment className='text-2xl text-main' />
          }
        </div>
        <div className='flex items-center justify-center col-span-1 p-2 m-2 bg-purple-200 rounded-md shadow-md'>
          <RiShareForwardLine className='text-2xl text-main' />
        </div>
      </div>
      {showComments &&
        <div>
          {/* comments section */}
          <div className="">
            <div className="grid grid-cols-5 gap-2 p-2">
              <input type="text" onChange={(e) => setData('comment', e.target.value)} name='comment' className='col-span-4 border-2 border-gray-400 rounded-md focus:border-main' />
              <div onClick={submit} className='flex items-center justify-center col-span-1 text-[1.3rem] text-white rounded-md bg-main'>
                <MdSend />
              </div>
            </div>
          </div>
          <div>
            {  }
          </div>
        </div>
      }
    </div>
  )
}
