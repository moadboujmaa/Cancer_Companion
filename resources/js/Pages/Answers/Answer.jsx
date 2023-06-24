import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import React, { useState, useEffect, useRef } from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { TbPencilPlus } from 'react-icons/tb'
import { Modal } from 'flowbite-react';
import { BsFillSendFill } from 'react-icons/bs'

export default function Answer({ auth, question }) {
  question = question[0]
  const [show, setShow] = useState(false)
  const { data, setData, post, processing, errors, reset } = useForm({
		content: '',
    question_id: question.id 
	});
  
  const submit = (e) => {
    e.preventDefault();
    setShow(false)
    post(route('answer.store', question.id));
  };
  const onClick = () => {
    setShow(true)
  }
  const onClose= () => {
    setShow(false)
  }
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
    <Authenticated auth={auth} roles={auth.user.roles}>
      <Head title='Answers' />
      <header className='max-w-2xl py-8 mx-auto text-center'>
        <p className='text-2xl font-semibold text-black'>Question by: <span className='text-main'>{question.user.name}</span></p>
        <p className='py-4 text-gray-800'>{question.content}</p>
        <p className='pt-[1px] bg-black'></p>
      </header>
      <div className="answers">
        {question.answers.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map(answer => {
          return (
            <div className='max-w-3xl p-3 mx-auto bg-white rounded-lg shadow-lg mb-3'>
              <div className='flex items-start justify-start'>
                <img src='../../images/1684960339-ef554d44-ff1b-430f-b639-4155fcac82a0.jpg' alt='profile-img' className='w-12 h-12 mb-2 mr-2 rounded-full' />
                <div className='flex flex-col items-start justify-center'>
                  <p className='font-semibold text-black'>{answer.user.name}</p>
                  <p className='text-gray-500'>{formatTimeDifference(answer.created_at)}</p>
                </div>
              </div>
              <p className='text-gray-800'>{answer.content}</p>
              <button className='px-5 py-2 mt-2 rounded-md bg-second text-main'>
                <AiOutlineStar className='text-2xl' />
              </button>
            </div>
          )
        })}
      </div>
      <div className='fixed flex items-center justify-center gap-2 px-3 py-2 text-white rounded-full cursor-pointer bottom-5 right-5 bg-main' onClick={onClick}>
        <TbPencilPlus className='text-2xl' />    
        <p>Add Answer</p>
      </div>
      <Modal
        show={show}
        onClose={onClose}
      >
        <Modal.Header>
          Add Answer
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <textarea 
              value={data.content} 
              name="content" 
              id="answer_content" 
              className='w-full rounded-md border-gray-500 border-2 focus:border-main' 
              onChange={(e) => setData('content', e.target.value)}></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='flex justify-end w-full'>
            <button className='flex items-center justify-center gap-2 px-4 py-2 text-lg text-white rounded-full cursor-pointer bg-main w-fit' onClick={submit}>
              <p className=''>Answer</p>
              <div>
                <BsFillSendFill className='text-lg' />
              </div>
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </Authenticated>
  )
}
