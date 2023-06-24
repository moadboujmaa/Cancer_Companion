import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { TbPencilPlus } from 'react-icons/tb'
import { BsFillSendFill } from 'react-icons/bs'
import React, { useState } from 'react';
import { Modal } from 'flowbite-react';
import { IoIosImage, IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io'
import InputError from '@/Components/InputError';
import Post from './Posts/Post';
import { usePage } from '@inertiajs/react';
import Cookies from 'js-cookie';

export default function Welcome({ auth }) {
    if (!Cookies.get('order-posts')) {
        Cookies.set('order-posts', 'asc')
    }
    if (!Cookies.get('posts-from')) {
        Cookies.set('posts-from', 'all')
    }
    const [show, setShow] = useState(false)
    const { liked_posts, roles, posts } = usePage().props
    const [order, setOrder] = useState(Cookies.get('order-posts'))
    const [postsFrom, setPostsFrom] = useState(Cookies.get('posts-from'))
    const { data, setData, post, processing, errors, reset } = useForm({
		content: '',
	});
    console.log(order)
    const submit = (e) => {
		e.preventDefault();
        setShow(!show)
		post(route('post.store'));
	};
    const onClick = () => {
        setShow(true)
    }
    const onClose= () => {
        setShow(false)
    }
    return (
        <Authenticated auth={auth} roles={roles} >
            <Head title='Home'/>
            <div className='grid gap-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1'>
                <div className="col-span-1 p-2 mt-3 bg-white rounded-md shadow-lg h-fit max-w-[500px] mx-auto w-full">
                    <h1 className='text-xl font-bold text-gray-900'>Order by:</h1>
                    <div 
                        className="flex items-center justify-start cursor-pointer gap-2 mt-1" 
                        onClick={() => {
                            Cookies.set('order-posts', 'asc')
                            setOrder('asc')
                        }}>
                        {order === 'asc' ? <IoMdRadioButtonOn className='text-xl text-main' /> : <IoMdRadioButtonOff className='text-xl text-main' />}
                        <p>Newest</p>
                    </div>
                    <div 
                        className="flex items-center justify-start cursor-pointer gap-2 mt-1" 
                        onClick={() => {
                            Cookies.set('order-posts', 'desc')
                            setOrder('desc')
                        }}
                    >
                        {order === 'desc' ? <IoMdRadioButtonOn className='text-xl text-main' /> : <IoMdRadioButtonOff className='text-xl text-main' />}
                        <p>Oldest</p>
                    </div>
                    <h1 className='text-xl font-bold mt-3 text-gray-900'>Posts from:</h1>
                    <div 
                        className="flex items-center justify-start cursor-pointer gap-2 mt-1" 
                        onClick={() => {
                            Cookies.set('posts-from', 'all')
                            setPostsFrom('all')
                        }}>
                        {postsFrom === 'all' ? <IoMdRadioButtonOn className='text-xl text-main' /> : <IoMdRadioButtonOff className='text-xl text-main' />}
                        <p>All</p>
                    </div>
                    <div 
                        className="flex items-center justify-start cursor-pointer gap-2 mt-1" 
                        onClick={() => {
                            Cookies.set('posts-from', 'following')
                            setPostsFrom('following')
                        }}>
                        {postsFrom === 'following' ? <IoMdRadioButtonOn className='text-xl text-main' /> : <IoMdRadioButtonOff className='text-xl text-main' />}
                        <p>Following</p>
                    </div>
                </div>
                <div className="lg:col-span-2 md:col-span-2 sm:col-span-1">
                {/* Display posts */}
                {
                    posts.map(post => <Post post_data={post} liked_posts={liked_posts} user={auth.user} />)
                }
                </div>
            </div>
            <React.Fragment>
            <div className='fixed flex items-center justify-center gap-2 px-3 py-2 text-white rounded-full cursor-pointer bottom-5 right-5 bg-main' onClick={onClick}>
                <TbPencilPlus className='text-2xl' />    
                <p>New Post</p>
            </div>
            <Modal
                show={show}
                onClose={onClose}
            >
                <Modal.Header>
                New Post
                </Modal.Header>
                <Modal.Body>
                <div className="">
                    <form  encType='multipart/form-data'>
                        <label htmlFor="content" className='text-gray-800 '>
                            What in your mind ?
                        </label>
                        <textarea 
                            name="content" 
                            id="content" 
                            className='w-full h-24 mb-3 border-2 border-gray-500 rounded-md focus:border-main' 
                            onChange={(e) => setData('content', e.target.value)}
                            required
                        ></textarea>
                        <InputError message={errors.content} className="mt-2" />
                        <div className='w-full'>
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
                    </form>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='flex justify-end w-full'>
                        <button className='flex items-center justify-center gap-2 px-4 py-2 text-xl text-white rounded-full cursor-pointer bg-main w-fit' onClick={submit}>
                            <p className=''>Send</p>
                            <div>
                                <BsFillSendFill />
                            </div>
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
            </React.Fragment>
        </Authenticated>
    );
}
