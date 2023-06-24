import { Head } from '@inertiajs/react';
import SideBar from './SideBar';

export default function Dashboard({ auth, children }) {
    return (
        <div className='h-screen flex items-start justify-start'>
            <Head title='Dashboard' />
            <SideBar />
            <div className='bg-gray-200 w-full'>
                {children}
                something
            </div>
        </div>
    );
}
