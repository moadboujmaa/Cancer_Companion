import React from 'react'
import { IoMdRadioButtonOn, IoMdRadioButtonOff } from 'react-icons/io'

export default function DoctorItem({ doctor, setSelectedDoctorId, selectedDoctorId }) {
  return (
    <div 
      className='shadow-lg mb-2 rounded-md cursor-pointer bg-gray-200 p-2 py-3 flex items-center justify-start gap-5' 
      onClick={() => setSelectedDoctorId(doctor.id)}
    >
      {selectedDoctorId === doctor.id ? <IoMdRadioButtonOn className='text-main text-2xl' /> : <IoMdRadioButtonOff className='text-main text-2xl' />}
      <img src={`images/${doctor.avatar}`} className='rounded-full w-12' alt="user picture" />
      <p className='text-black'>{doctor.name}</p>
    </div>
  )
}
