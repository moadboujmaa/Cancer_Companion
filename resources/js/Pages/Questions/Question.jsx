import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'
import { IoMdSend } from 'react-icons/io'

export default function Question({auth, questions}) {
  console.log(questions)
  const { data, setData, post, processing, errors, reset } = useForm({
		content: '',
	});
  const submit = (e) => {
		e.preventDefault();
		post(route('question.store'));
	};
  return (
    <Authenticated auth={auth} roles={auth.roles} >
      <Head title='Questions' />

      <div className='mx-auto w-max-7xl'>
        <div className='flex items-center justify-center w-full m-2'>
          <div className='relative m-2 lg:w-[400px] md:w-[400px] sm:w-full'>
            <input onChange={(e) => setData('content', e.target.value)} type="text" placeholder='new question' className='w-full pr-10 border-2 rounded-lg shadow-lg border-main focus:ring-0 focus:border-main'/>
            <div onClick={submit} className='bg-main w-10 h-10 rounded-r-md cursor-pointer flex items-center justify-center absolute top-[1.5px] right-[1px]'>
              <IoMdSend className='text-2xl text-white' />
            </div>
          </div>
        </div>
        <div className='grid gap-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1'>
          {questions.map(question => <div className="col-span-1 p-3 bg-white rounded-lg shadow-lg h-fit">
            <p className='text-gray-800'><span className='font-bold text-black'>Question: </span>{question.content} ?</p>
            <p className='mt-2 text-main'><span className='font-bold text-black'>Asked by: </span>{question.user.name}</p>
            <p className='mt-2 text-main'><span className='font-bold text-black'>Answers: </span>{question.answers.length ? question.answers.length : 0}</p>
            <Link href={route('answer.index', question.id)}>
              <button className='w-full p-2 mt-2 text-white rounded-md bg-main'>See Answers</button>
            </Link>
          </div>)}
        </div>
      </div>
    </Authenticated>
  )
}
