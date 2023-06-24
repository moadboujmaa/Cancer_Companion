import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import { Modal } from 'flowbite-react';
import axios from 'axios'
import ArticleItem from './ArticleItem';
import { Toast } from 'flowbite-react';
import { HiX } from 'react-icons/hi';
import InputError from '@/Components/InputError';

export default function Article({ auth, articles }) {
  const [show, setShow] = useState(false)
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
		link: '',
	});
  const onClick = () => {
    setShow(true)
  }
  const onClose= () => {
    setShow(false)
  }
  console.log(articles)
  const handleSubmit = () => {
    axios.post('/article', data)
      .then(res => {
        console.log(res.config.data)
      }) 
      .catch(err => {
        setError(err.response.data.err)
      })
  }
  return (
    <Authenticated auth={auth}>
      <Head title='Articles' />
      <div onClick={onClick} className='bg-main rounded-full cursor-pointer px-5 py-2 text-white font-semibold my-3 flex items-center gap-3 w-fit'>
        <p className='font-semibold'>Request new article</p>
        <AiOutlineAppstoreAdd  className='text-2xl'/>
      </div>
      <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-3'>
        {articles.map(article => <ArticleItem key={article.id} article={article} />)}
      </div>
      <Modal
          show={show}
          onClose={onClose}
        >
          <Modal.Header>
            Create new article
          </Modal.Header>
          <Modal.Body>
            <div>
              <p className='text-xs font-semibold text-main'>Share the best articles your read in the internet</p>
              <p className='text-sm text-gray-800 font-semibold mt-3'>Title of the article</p>
              <input type="text" name='title' className='w-full pr-10 border-2 rounded-lg shadow-lg border-main focus:ring-0 focus:border-main' placeholder='e.g - 10 types of cancer' onChange={(e) => setData('title', e.target.value)} />
              <p className='text-sm text-gray-800 font-semibold mt-3'>Link to the article</p>
              <InputError message={errors.title} className="mt-2" />
              <input type="text" name='link' className='w-full pr-10 border-2 rounded-lg shadow-lg border-main focus:ring-0 focus:border-main' placeholder='e.g - https://xyz.com' onChange={(e) => setData('link', e.target.value)} />
              <InputError message={errors.link} className="mt-2" />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className='w-full cursor-pointer' onClick={handleSubmit}>
              <div onClick={onClose} className='rounded-full cursor-pointer py-2 px-4 text-white bg-main flex items-center justify-center gap-2 mt-2' >
                <p>Add</p>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
    </Authenticated>
  )
}
