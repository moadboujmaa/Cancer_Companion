import Authenticated from '@/Layouts/AuthenticatedLayout'
import React, { useState, useEffect } from 'react'
import { Tooltip } from 'flowbite-react';
import axios from 'axios'
import { Head } from '@inertiajs/react';
import { MdOutlineContentCopy } from 'react-icons/md'
import { FiRefreshCcw } from 'react-icons/fi'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Spinner } from 'flowbite-react';

export default function Quote({ auth }) {
  // state for all the quotes got from api
  const [Quotes, setQuotes] = useState([]);
  // store one quote to display 
  const [Quote, setQuote] = useState(null);
  // when this state toggled the Quote state choose a random quote
  const [change, setChange] = useState(false)
  // 
  const [isCopied, setIsCopied] = useState(false);
  // 
  const [isFav, setIsFav] = useState(false);
  const randomIndex = Math.floor(Math.random() * Quotes.length);
  
  // Getting all quotes from api
  useEffect(() => {
    axios.get('https://type.fit/api/quotes')
      .then(async (response) => {
        const data = await response.data
        setQuotes(data)
        setQuote(Quotes[randomIndex])
      })
      .catch(err => console.log('error getting data', err))
  }, []);
  // Store one quote in state the value of "change state" changed and after checking if quotes is full 
  useEffect(() => {
    if (Quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * Quotes.length);
      setQuote(Quotes[randomIndex]);
    }
  }, [change, Quotes]);
  // Show toast for 2.5s after copying the quote
  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 2500);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isCopied]);
  // function to add quote to favorite
  const handleAddingFav = () => {
    axios.post('/quote/fav', {
      text: Quote.text,
      author: Quote.author
    })
      .then(res => {
        console.log(res.data.message)
        setIsFav(true)
      })
      .catch(err => console.log('error exist', err))
  }
  

  return (
    <Authenticated auth={auth.user.roles}>
      <Head title='Quotes'/>
      <div className='h-[91vh] flex items-center justify-center'>
        {Quote 
          ? <div className='text-center mx-2'>
            <p className='text-4xl font-bold text-gray-900'>{Quote.text}</p>
            <p className='text-xl text-main mt-2'>{Quote.author}</p>
            <div className='mt-5 fixed left-1/2 -translate-x-1/2 bottom-10 flex justify-center items-center gap-6'>
              <Tooltip
                content="Copy Quote"
                placement="top"
                className='mb-2 bg-gray-700'
                arrow={false}
              >
                <CopyToClipboard text={Quote.text}
                  onCopy={() => setIsCopied({copied: true})}>
                  <div className='bg-main text-white cursor-pointer border-main border-2 rounded-full w-12 h-12 flex items-center justify-center text-2xl'>
                    <MdOutlineContentCopy />
                  </div>
                </CopyToClipboard>
              </Tooltip>
              <Tooltip
                content="New One"
                placement="top"
                className='mb-2 bg-gray-700'
                arrow={false}
              >
                <div onClick={() => {
                  setChange(!change)
                  setIsFav(false)
                }} className='border-2 cursor-pointer border-main text-main rounded-full w-12 h-12 flex items-center justify-center text-2xl'>
                  <FiRefreshCcw /> 
                </div>
              </Tooltip>
              <Tooltip
                content="Add Fav"
                placement="top"
                className='mb-2 w-[85px] bg-gray-700'
                arrow={false}
              >
                <div onClick={() => {
                  handleAddingFav()
                }} className='border-2 cursor-pointer border-main text-main rounded-full w-12 h-12 flex items-center justify-center text-2xl'>
                  {isFav ? <AiFillHeart /> : <AiOutlineHeart /> }
                </div>
              </Tooltip>
              {isCopied && <div className='fixed right-5 top-5 bg-white shadow-lg w-fit'>Quote copied successfully</div>}
            </div>
          </div> 
          : <Spinner aria-label="Default status example" size='xl' />
        }
      </div>
    </Authenticated>
  )
}
