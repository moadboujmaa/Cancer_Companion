import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function Index({auth}) {
  console.log(auth)
  return (
    <Authenticated auth={auth}>
      <Head title='Chat' />
      <p>Message</p>
    </Authenticated>
  )
}
