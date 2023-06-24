import React from 'react'

export default function StepThree({ data, setData, errors }) {
  return (
    <div className=''>
      <div className='mb-4'>
        <p className='mb-2 text-xl font-semibold text-main'>What is your role ?</p>
        <div>
          <input type="radio" onChange={(e) => setData('role', 'sick')} checked={data.role == 'sick'} name="role" id="sick" />
          <label htmlFor="sick" className='pl-3'>I have cancer</label>
        </div>
        <div>
          <input type="radio" onChange={(e) => setData('role', 'notSick')} checked={data.role == 'notSick'}  name="role" id="notSick" />
          <label htmlFor="notSick" className='pl-3'>I don't have cancer</label>
        </div>
        <div>
          <input type="radio" onChange={(e) => setData('role', 'doctor')} checked={data.role == 'doctor'} name="role" id="doctor" />
          <label htmlFor="doctor" className='pl-3'>I'm a doctor</label>
        </div>
      </div>
      {data.role == 'doctor' &&
        <div className='mb-4'>
          <p className='mb-2 text-xl font-semibold text-main'>Can we contact you in urgent cases</p>
          <div>
            <input type="radio" onChange={(e) => setData('couldHelp', 1)} checked={data.couldHelp == 1} name="answer" id="yes" />
            <label htmlFor="yes" className='pl-3'>Yes</label>
          </div>
          <div>
            <input type="radio" onChange={(e) => setData('couldHelp', 0)} checked={data.couldHelp == 0} name="answer" id="no" />
            <label htmlFor="no" className='pl-3'>no</label>
          </div>
        </div>
      }
    </div>
  )
}
