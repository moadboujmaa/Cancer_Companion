import React from 'react'
import { useForm } from "@inertiajs/react"
import { RxCross1 } from 'react-icons/rx'

export default function NewPost({ auth, setIsOpen }) {
  const { data, setData, post, processing, errors, reset } = useForm({
		content: '',
		user_id: auth.user.id,
    image: ''
	});
  const submit = (e) => {
		e.preventDefault();
		post(route('register'));
		if (errors) {
			setCurrentStep(1)
		}
	};
  return (
    <div className='p-2 rounded-md shadow-lg'>
      <div className='p-1 text-white rounded-full cursor-pointer bg-second w-fit' onClick={() => setIsOpen( false)}>
        <RxCross1 />
      </div>
      <hr className='my-3' />
      <h1 className='mb-3 text-2xl text-center text-gray-900'>Create New Post</h1>
      <textarea name="content" id="content" className='w-96'></textarea>
    </div>
  )
}
