import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React, { useState, useEffect } from 'react'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { Modal } from 'flowbite-react';
import { AiOutlinePlus } from 'react-icons/ai'
import AddReminder from './AddReminder';
import { useForm } from '@inertiajs/react';


export default function Reminder({ auth, reminders }) {
  const [first_hour, setFHour] = useState(0)
  const [second_minute, setSMinute] = useState(0)
  const [third_hour, setTHour] = useState(0)
  const [first_minute, setFMinute] = useState(0)
  const [second_hour, setSHour] = useState(0)
  const [third_minute, setTMinute] = useState(0)
  let first_time =  `${first_hour<10 ? `0${first_hour}` : first_hour}:${first_minute<10 ? `0${first_minute}` : first_minute}:00`
  let second_time = `${second_hour<10 ? `0${second_hour}` : second_hour}:${second_minute<10 ? `0${second_minute}` : second_minute}:00`
  let third_time = `${third_hour<10 ? `0${third_hour}` : third_hour}:${third_minute<10 ? `0${third_minute}` : third_minute}:00` 
  const { data, setData, post, processing, errors, reset } = useForm({
		medicine: '',
    type: 'daily',
    nb_times: 1,
    first_time: first_time,
    second_time: second_time,
    third_time: third_time
  });
  useEffect(() => {
    setData('first_time', first_time)
    setData('second_time', second_time)
    setData('third_time', third_time)
  }, [first_hour,
    second_minute,
    third_hour,
    first_minute,
    second_hour,
    third_minute,])
  const [show, setShow] = useState(false)
  const onClick = () => {
    setShow(true)
  }
  const onClose= () => {
      setShow(false)
  }
  let currentDate = new Date()
  const otherDate = new Date('2023-05-31T20:45:15')
  const handleClick = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Hello, world!');
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('Hello, world!');
        }
      });
    }
  };
  reminders = ['test']
  useEffect(() => {
    const interval = setInterval(() => {
      currentDate = new Date()
      if (currentDate.getTime() === otherDate.getTime()) {
        // handleClick()
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  console.log(data)
  console.log(first_time)
  return (
    <Authenticated auth={auth} roles={auth.user.roles}>
      <Head title='Reminder' />
      <div className='mx-auto max-w-7xl'>
        <div className="py-3">
          <h1 className='text-2xl font-bold text-gray-950'>Medicine reminder</h1>
          {reminders ? <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 py-3'>
            <div className="col-span-1 w-auto bg-white p-2 rounded-md shadow-lg">
              <p className='text-lg text-900 font-semibold pb-2'>Lorem, ipsum dolor.</p>
              <div className='flex items-center justify-between'>
                <p>Daily</p>
                <span className='py-1 text-white bg-main rounded-md px-3 cursor-pointer'>Edit</span>
              </div>
            </div>
            <div className="col-span-1 w-auto bg-white p-2 rounded-md shadow-lg">
              <p className='text-lg text-900 font-semibold pb-2'>Lorem, ipsum dolor.</p>
              <div className='flex items-center justify-between'>
                <p>Daily</p>
                <span className='py-1 text-white bg-main rounded-md px-3 cursor-pointer'>Edit</span>
              </div>
            </div>
            <div className="col-span-1 w-auto bg-white p-2 rounded-md shadow-lg">
              <p className='text-lg text-900 font-semibold pb-2'>Lorem, ipsum dolor.</p>
              <div className='flex items-center justify-between'>
                <p>Daily</p>
                <span className='py-1 text-white bg-main rounded-md px-3 cursor-pointer'>Edit</span>
              </div>
            </div>
          </div> : <div className='w-full text-center py-3 text-xl font-bold text-gray-500'>
            <p>You don't have a reminders right now </p>
          </div>}
          <div className='flex items-center justify-center'>
            <div className='rounded-full cursor-pointer py-2 px-4 text-white bg-main flex items-center justify-center gap-2 mt-2' onClick={onClick}>
              <p>Add reminder</p>
              <AiOutlinePlus className='text-white text-xl ' />
            </div>
          </div>
        </div>
        <div className="doctor-visit-reminder"></div>
        <Modal
          show={show}
          onClose={onClose}
        >
          <Modal.Header>
            Add new reminder
          </Modal.Header>
          <Modal.Body>
            <AddReminder 
              key='reminders' 
              data={data} 
              setData={setData} 
              errors={errors} 
              setFHour={setFHour}
              setSMinute={setSMinute}
              setTHour={setTHour}
              setFMinute={setFMinute}
              setSHour={setSHour}
              setTMinute={setTMinute}
            />
          </Modal.Body>
          <Modal.Footer>
            <div className='w-full'>
              <div onClick={onClose} className='rounded-full cursor-pointer py-2 px-4 text-white bg-main flex items-center justify-center gap-2 mt-2' >
                <p>Add</p>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </Authenticated>
  )
}
