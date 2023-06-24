import InputError from '@/Components/InputError';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react'
import { RiMailSendFill } from 'react-icons/ri';
import { Modal } from 'flowbite-react';
import DoctorItem from './DoctorItem';
import { Link } from 'react-router-dom';


export default function Urgent({ auth, doctors }) {
  const [isSent, setIsSent] = useState(false)
  const [selectedDoctorId, setSelectedDoctorId] = useState(null)
  const { data, setData, post, processing, errors, reset } = useForm({
		explain: ''
  });
  console.log(selectedDoctorId)
  const [show, setShow] = useState(false)
  const onClick = () => {
    setShow(true)
  }
  const onClose= () => {
      setShow(false)
  }
  const handleSubmit = () => {
    axios.post('/urgent-mail', data)
      .then((response) => {
        console.log(response)
        setIsSent(true)
      })
      .catch((err) => console.log(err))

  };
  return (
    <Authenticated auth={auth}>
      <Head title='Urgent' /> 
      {isSent 
        ? <div className='h-[91.5vh] flex items-center justify-center flex-col'>
          <div className='bg-second text-main rounded-full p-10 w-fit h-fit flex items-center justify-center'>
            <RiMailSendFill className='text-8xl' />
          </div>
          <p className='text-gray-800 text-xl mt-5'>An email is sent to all the doctors nears you.</p>
          <p className='text-gray-800 text-xl'>We hope you will find someone to help you.</p>
          <p className='text-main mt-5 mb-2'>You can still contact a doctor directly from hear</p>
          <button className='main-btn' onClick={onClick}>Search</button>
          <Modal
            show={show}
            onClose={onClose}
          >
            <Modal.Header>
              Select a doctor and contact
            </Modal.Header>
            <Modal.Body>
              <div className='h-fit w-full relative'>
                <input type="text" className='w-full mb-5 rounded-sm border-2 border-main ' />
              </div>
              <div className='max-h-[300px] overflow-y-scroll'>
                {doctors.map(doctor => <DoctorItem selectedDoctorId={selectedDoctorId} doctor={doctor} setSelectedDoctorId={setSelectedDoctorId} />)}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className='w-full'>
                <a href={`/chat/${selectedDoctorId}`}>
                  <div onClick={onClose} className='rounded-full cursor-pointer py-2 px-4 text-white bg-main flex items-center justify-center gap-2 mt-2' >
                    <p>Contact</p>
                  </div>
                </a>
              </div>
            </Modal.Footer>
          </Modal>
        </div> 
        : <div className='h-[91.5vh] flex items-center justify-center flex-col'>
        <h1 className='text-main text-5xl font-semibold text-center'>We are sorry to hear that you <br /> are in this situation</h1>
        <h2 className='my-3 text-xl text-gray-800'>Please explain your situation and we're going to contact a doctor for you</h2>  
        <textarea className='w-full lg:w-[50%] border-2 border-main rounded-md focus:ring-0 focus:border-main' name="explain" onChange={(e) => setData('explain', e.target.value)} ></textarea>
        <InputError message={errors.explain} className="mt-2" />
        <button className='bg-main border-2 border-main text-white mt-3 w-28 text-xl rounded-sm py-1' onClick={handleSubmit}>Send</button>
      </div>}
    </Authenticated>
  )
}
