import React, { useState } from 'react'
import { Link } from '@inertiajs/react';
import { Dropdown, Tooltip } from 'flowbite-react';
import { AiFillHome, AiOutlineQuestionCircle, AiOutlineArrowRight, AiOutlineAlert } from 'react-icons/ai'
import { RiAdminFill, Ri24HoursFill } from 'react-icons/ri'
import { HiCollection } from 'react-icons/hi'
import { HiChatBubbleLeftRight, HiQueueList } from 'react-icons/hi2'
import { BsCalendarWeek } from 'react-icons/bs'
import { TbBlockquote, TbMoodKid } from 'react-icons/tb'
import { FaRegNewspaper } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { TbLogout } from 'react-icons/tb'
import { AiOutlineSchedule } from 'react-icons/ai'
 

export default function NavBar({auth}) {
    let isAdmin = null
    if (auth.user) {
        isAdmin = auth.user.roles.some(item => item.name == 'admin');
    }

    return (
        <nav className='flex items-center justify-between w-full h-16 px-3 bg-white shadow-lg'>
            <div className="h-full">
                <img src='images/logo.png' className='h-full' alt="" />
            </div>
            <div className="flex items-center justify-center gap-5">
                <Link href={route('home')}>
                    <p className='px-4 py-2 text-xl rounded-full bg-second text-main'>
                        <Tooltip
                            content="Home"
                            placement="bottom"
                            className='mt-2 bg-gray-700'
                            arrow={false}
                        >
                            <AiFillHome />
                        </Tooltip>
                    </p>
                </Link>
                <Dropdown
                    label={<HiQueueList className='text-xl'/>}
                    dismissOnClick={false}
                    class='text-xl rounded-full cursor-pointer bg-second text-main'
                >
                    <div className='grid gap-3 px-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1'>
                        <Link href={route('question.index')}>
                            <div className='col-span-1 p-2 shadow-[0px_0px_10px_6px_#e2e8f0] rounded-md flex items-center justify-between gap-3'>
                                <div className='p-3 rounded-full bg-second'>
                                    <AiOutlineQuestionCircle className='text-2xl text-main' />
                                </div>
                                <p className='font-semibold text-gray-900'>Ask A Question</p>
                                <AiOutlineArrowRight className='text-xl font-bold text-main'/>
                            </div>
                        </Link>
                        <Link href={route('reminder.index')}>
                            <div className='col-span-1 p-2 shadow-[0px_0px_10px_6px_#e2e8f0] rounded-md flex items-center justify-between gap-3'>
                                <div className='p-3 rounded-full bg-second'>
                                    <BsCalendarWeek className='text-2xl text-main' />
                                </div>
                                <p className='font-semibold text-gray-900'>Medicine Reminder</p>
                                <AiOutlineArrowRight className='text-xl font-bold text-main'/>
                            </div>
                        </Link>
                        <Link href={route('article.index')}>
                            <div className='col-span-1 p-2 shadow-[0px_0px_10px_6px_#e2e8f0] rounded-md flex items-center justify-between gap-3'>
                                <div className='p-3 rounded-full bg-second'>
                                    <FaRegNewspaper className='text-2xl text-main' />
                                </div>
                                <p className='font-semibold text-gray-900'>Articles & News</p>
                                <AiOutlineArrowRight className='text-xl font-bold text-main'/>
                            </div> 
                        </Link>
                        <div className='col-span-1 p-2 shadow-[0px_0px_10px_6px_#e2e8f0] rounded-md flex items-center justify-between gap-3'>
                            <div className='p-3 rounded-full bg-second'>
                                <HiCollection className='text-2xl text-main' />
                            </div>
                            <p className='font-semibold text-gray-900'>Cancer Types</p>
                            <AiOutlineArrowRight className='text-xl font-bold text-main'/>
                        </div>
                        <Link href={route('quote.index')}>
                            <div className='col-span-1 p-2 shadow-[0px_0px_10px_6px_#e2e8f0] rounded-md flex items-center justify-between gap-3'>
                                <div className='p-3 rounded-full bg-second'>
                                    <TbBlockquote className='text-2xl text-main' />
                                </div>
                                <p className='font-semibold text-gray-900'>Quote</p>
                                <AiOutlineArrowRight className='text-xl font-bold text-main'/>
                            </div>
                        </Link>
                        <div className='col-span-1 p-2 shadow-[0px_0px_10px_6px_#e2e8f0] rounded-md flex items-center justify-between gap-3'>
                            <div className='p-3 rounded-full bg-second'>
                                <Ri24HoursFill className='text-2xl text-main' />
                            </div>
                            <p className='font-semibold text-gray-900'>Daily Tracker</p>
                            <AiOutlineArrowRight className='text-xl font-bold text-main'/>
                        </div>
                        <div className='col-span-1 p-2 shadow-[0px_0px_10px_6px_#e2e8f0] rounded-md flex items-center justify-between gap-3'>
                            <div className='p-3 rounded-full bg-second'>
                                <TbMoodKid className='text-2xl text-main' />
                            </div>
                            <p className='font-semibold text-gray-900'>For kids</p>
                            <AiOutlineArrowRight className='text-xl font-bold text-main'/>
                        </div>
                        <Link href={route('urgent.index')}>
                            <div className='col-span-1 p-2 shadow-[0px_0px_10px_6px_#e2e8f0] rounded-md flex items-center justify-between gap-3'>
                                <div className='p-3 bg-red-300 rounded-full'>
                                    <AiOutlineAlert className='text-2xl text-red-600' />
                                </div>
                                <p className='font-semibold text-gray-900'>Urgent case</p>
                                <AiOutlineArrowRight className='text-xl font-bold text-red-600'/>
                            </div>
                        </Link>
                    </div>
                </Dropdown>
                <Link href='/chat'>
                    <p className='px-4 py-2 text-xl rounded-full cursor-pointer bg-second text-main'>
                        <Tooltip
                            content="Messages"
                            placement="bottom"
                            className='mt-2 bg-gray-700'
                            arrow={false}
                        >
                            <HiChatBubbleLeftRight />
                        </Tooltip>
                    </p>
                </Link>
                {isAdmin &&
                    <Link href={route('dashboard')}>
                        <p className='px-4 py-2 text-xl rounded-full cursor-pointer bg-second text-main'>
                            <Tooltip
                                content="Admin Panel"
                                placement="bottom"
                                className='mt-2 bg-gray-700'
                                arrow={false}
                            >
                                <RiAdminFill />
                            </Tooltip>
                        </p>
                    </Link>
                }
            </div>
            {auth.user ? (
                <Dropdown
                    label={<img src={auth.user.avatar ? `images/${auth.user.avatar}` : `icons/user.png`} alt="profile pic" className='rounded-full w-9 h-9 ' />}
                    dismissOnClick={false}
                    class='text-xl rounded-full cursor-pointer'
                >
                    <div className=''>
                        <Link href={route('profile.index')}>
                            <div className='flex items-center gap-4 px-6 py-2 font-semibold text-main hover:bg-second'>
                                <CgProfile  className='text-2xl'/>
                                <p className='text-[17px]'>Profile</p>
                            </div>
                        </Link>
                    </div>
                    <div className=''>
                        <Link href={route('profile.index')}>
                            <div className='flex items-center gap-4 px-6 py-2 font-semibold text-main hover:bg-second'>
                                <AiOutlineSchedule  className='text-2xl'/>
                                <p className='text-[17px]'>Appointment</p>
                            </div>
                        </Link>
                    </div>
                    <div className=''>
                        <Link href={route('logout')} method='post'>
                            <div className='flex items-center justify-start gap-4 px-6 py-2 font-semibold text-main hover:bg-second'>
                                <TbLogout  className='text-2xl'/>
                                <p className='text-[17px]'>Log Out</p>
                            </div>
                        </Link>
                    </div>
                </Dropdown>
            ) : (
                <div className='flex gap-3'>
                    <Link
                        href={route('login')}
                        className="second-btn"
                    >
                        Log in
                    </Link>

                    <Link
                        href={route('register')}
                        className="main-btn"
                    >
                        Register
                    </Link>
                </div>
            )}
        </nav>
    )
}
