import { useState } from 'react';
import Navbar from '@/Components/NavBar';

export default function Authenticated({ children, auth }) {
    return (
        <div className="min-h-screen overflow-x-hidden bg-gray-100">
            <Navbar auth={auth} />

            <main className='px-5 mx-auto max-w-7xl'>{children}</main>
        </div>
    );
}
