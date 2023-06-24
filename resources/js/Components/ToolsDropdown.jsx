import React from 'react'
import { Dropdown } from 'flowbite-react';
import { AiOutlineArrowRight } from 'react-icons/ai'
import { HiChatBubbleLeftRight, HiQueueList } from 'react-icons/hi2'


export default function ToolsDropdown({ tools }) {
  return (
    <Dropdown
      label={<HiQueueList className='text-xl'/>}
      dismissOnClick={false}
      class='text-xl rounded-full cursor-pointer bg-third text-main'
    >
      <div className='grid grid-cols-2 gap-3 px-3'>
        {tools.map(tool => {
          <div key={tool.id} className='col-span-1 p-2 shadow-[0px_0px_10px_6px_#e2e8f0] rounded-md flex items-center justify-center gap-3'>
            <div className='p-3 rounded-full bg-third'>
            {console.log(tool)}
              {tool.icon}
            </div>
            <p className='font-semibold text-gray-900'>{tool.text}</p>
            <AiOutlineArrowRight className='text-xl font-bold text-main'/>
          </div>
        })}
      </div>
    </Dropdown>
  )
}
