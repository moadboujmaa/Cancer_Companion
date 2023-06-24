import React from 'react'
import countryList from './CountriesArr'
import TextInput from './TextInput'
import { MdAddPhotoAlternate } from 'react-icons/md'
import InputError from './InputError'

export default function StepTwo({ data, setData, errors }) {
  return (
    <>
      <div className="mb-3">
        <p className='mb-2 text-xl font-semibold text-main'>Gender</p>
        <input 
          type="radio" 
          name='gender' 
          id='male' 
          value='male' 
          defaultChecked={data.gender === "male"}
          className='mr-3' 
          onChange={(e) => {
            setData('gender', e.target.value)
            console.log(data.gender)
          }}
        />
        <label htmlFor="male" className='mr-2'>Male</label>
        <input 
          type="radio" 
          name='gender' 
          id='female' 
          value='female' 
          className='mr-3'
          defaultChecked={data.gender === "female"}
          onChange={(e) => {
            setData('gender', e.target.value)
            console.log(data.gender)
          }}
        />
        <label htmlFor="female" className='mr-2'>Female</label>
        <InputError message={errors.gender} className="mt-2" />
      </div>
      <div className='mb-3'>
        <label className='mb-2 text-xl font-semibold text-main'>Country</label><br />
        <select 
          className='flex items-center justify-center w-full gap-2 py-2 mt-2 font-semibold bg-white border-2 rounded-md border-main text-main'
          onChange={(e) => setData('country', e.target.value)}
          name='country'
        >
          {countryList.map(item => <option value={item} key={item}>{item}</option>)}
        </select>
        <InputError message={errors.country} className="mt-2" />
      </div>
      <div className='mb-3'>
        <p className='mb-2 text-xl font-semibold text-main'>Profile Pic</p>
        <div className='border-2 border-dashed rounded-md border-main'>
          <div className='flex items-center justify-center'>
            <label className='cursor-pointer p-6 w-[100%] flex items-center justify-center flex-col text-main' htmlFor='avatar'>
              <MdAddPhotoAlternate className='text-3xl' />
              <p className='font-semibold '>Choose A Photo</p>
              <InputError message={errors.avatar} className="mt-2" />
          {data.avatar ? <p>Avatar Selected</p> : ""}
            </label><br />
            <TextInput 
              type='file' 
              onChange={(e) => setData('avatar', e.target.files[0])} 
              name='avatar' 
              id='avatar' 
              className='hidden' 
            />
          </div>

          
        </div>
      </div>
    </>
  )
}
