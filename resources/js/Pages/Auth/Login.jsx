import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout imgPath='imgs/login.png'>
            <Head title="Log in" />
            
            {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}
            <form onSubmit={submit} className='lg:w-96 md:w-96 sm:w-full'>
                <div className='flex items-center justify-center w-full'>
                    <img src="images/logo.svg" className='mb-3 w-52' alt="logo" />
                </div>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput id="email" type="email" name="email" value={data.email} className="w-full p-2 my-2 border-2 rounded-md outline-none border-main" autoComplete="username" isFocused={true} placeholder='Email' onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput id="password" type="password" name="password" value={data.password} className="w-full p-2 my-2 border-2 rounded-md outline-none border-main" autoComplete="current-password" placeholder='Password' onChange={(e) => setData('password', e.target.value)}
                    />          
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox name="remember" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} />
                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {/* {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )} */}
                    <button type='submit' className='w-full py-3 main-btn' disabled={processing}>
                        Log In
                    </button>
                </div>
                <p className='mt-3 font-semibold text-center text-gray-900'>
                    Don't have an account ? 
                    <Link 
                        href={route('register')}
                        className='font-semibold cursor-pointer text-main hover:underline'
                    > 
                        Sign Up
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
