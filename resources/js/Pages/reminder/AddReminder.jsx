import React from 'react'
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function AddReminder({ 
    data, 
    setData, 
    errors,
    setFHour,
    setSMinute,
    setTHour,
    setFMinute,
    setSHour,
    setTMinute
  }) {
  return (
    <div>
      <div>
        <p className='text-sm text-gray-800 font-semibold'>Medicine name</p>
        <TextInput
            id="medicine"
            name="medicine"
            type='text'
            value={data.medicine}
            className="w-full p-2 my-2 border-2 rounded-md outline-none border-main"
            autoComplete="medicine"
            isFocused={true}
            placeholder="Medicine name"
            onChange={(e) => setData('medicine', e.target.value)}
            required
        />
        <InputError message={errors.name} className="mt-2" />
      </div>
      <div>
        <p className='text-sm text-gray-800 font-semibold'>Frequency</p>
        <select 
          name="type" 
          id="type"
          value={data.type}
          className='w-full border-2 border-main rounded-md my-2'
          onChange={(e) => setData('type', e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <InputError message={errors.type} className="mt-2" />
      </div>
      <p className='text-sm text-gray-800 font-semibold'>How many times a day ?</p>
      <div className='flex gap-6 mb-1'>
        <div className='flex items-center gap-2'>
          <input 
            type="radio" 
            id="one" 
            name="nb_times" 
            onChange={(e) => {setData('nb_times', 1)}}
            value={data.nb_times}
            defaultChecked
          />
          <label htmlFor="one">One time</label>
        </div>
        {data.type === "daily" && <>
          <div className='flex items-center gap-2'>
            <input 
              type="radio" 
              id="two" 
              name="nb_times"
              value={data.nb_times}
              onChange={(e) => {setData('nb_times', 2)}} 
            />
            <label htmlFor="two">Two times</label>
          </div>
          <div className='flex items-center gap-2'>
            <input 
              type="radio" 
              id="three" 
              name="nb_times"
              value={data.nb_times}
              onChange={(e) => {setData('nb_times', 3)}} />
            <label htmlFor="three">Three times</label>
          </div>
        </>}
        <InputError message={errors.nb_times} className="mt-2" />
      </div>
      <p className='text-sm text-gray-800 font-semibold'>First time</p>
      <div className='grid grid-cols-2 gap-2 pb-2'>
        <div className='col-span-1'>
          <input 
            type="number" 
            max='23' 
            min='0' 
            name='first_hour'
            className='rounded-md border-2 border-main w-full'
            // value={data.medicine_hour}
            placeholder='Hours'
            onChange={(e) => setFHour(e.target.value)}
          />
        </div>
        <div className='col-span-1'>
          <input 
            type="number" 
            max='60' 
            min='0' 
            name='medicine_minute'
            className='rounded-md border-2 border-main w-full'
            value={data.medicine_minute}
            placeholder='Minutes'
            onChange={(e) => setFMinute(e.target.value)}
          />
        </div>
      </div>
      {((data.nb_times === 2 || data.nb_times === 3) && data.type === "daily") &&
      <>
        <p className='text-sm text-gray-800 font-semibold'>Second time</p>
        <div className='grid grid-cols-2 gap-2 pb-2'>
          <div className='col-span-1'>
              <input 
              type="number" 
              max='23' 
              min='0' 
              name='medicine_hour'
              className='rounded-md border-2 border-main w-full'
              value={data.medicine_hour}
              placeholder='Hours'
              onChange={(e) => setSHour(e.target.value)}
            />
          </div>
          <div className='col-span-1'>
            <input 
              type="number" 
              max='60' 
              min='0' 
              name='medicine_minute'
              className='rounded-md border-2 border-main w-full'
              value={data.medicine_minute}
              placeholder='Minutes'
              onChange={(e) => setSMinute(e.target.value)}
            />
          </div>
        </div>
        { data.nb_times === 3 && <>
            <p className='text-sm text-gray-800 font-semibold'>Third time</p>
            <div className='grid grid-cols-2 gap-2 pb-2'>
              <div className='col-span-1'>
                <input 
                  type="number" 
                  max='23' 
                  min='0' 
                  name='medicine_hour'
                  className='rounded-md border-2 border-main w-full'
                  value={data.medicine_hour}
                  placeholder='Hours'
                  onChange={(e) => setTHour(e.target.value)}
                />
              </div>
              <div className='col-span-1'>
                <input 
                  type="number" 
                  max='60' 
                  min='0' 
                  name='medicine_minute'
                  className='rounded-md border-2 border-main w-full'
                  value={data.medicine_minute}
                  placeholder='Minutes'
                  onChange={(e) => setTMinute(e.target.value)}
                />
              </div>
            </div>
          </>
        }   
      </>}
    </div>
  )
}
